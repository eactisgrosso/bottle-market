import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../../../common/auth/graphql.auth.guard';
import { ProductType } from '../../../common/types/product.enum';
import Gallery from '../../../common/types/gallery.type';
import ProductQuery from '../../../common/data/product.query';
import { StoreProductRepository } from '../../domain/repositories/store_product.repository';
import {
  GetProductsArgs,
  StoreProductDTO,
  StoreProducts,
  ChangeProductAvailability,
} from './store_product.types';

const getUuid = require('uuid-by-string');

@Injectable()
@Resolver()
export class StoreProductResolver {
  private productQuery: ProductQuery;

  constructor(
    private repository: StoreProductRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any
  ) {
    this.productQuery = new ProductQuery(knex);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => StoreProducts, {
    description: 'Get all the products with the store ones toggled',
  })
  async storeProducts(
    @Args()
    { limit, offset, store_id, type, searchText, category }: GetProductsArgs
  ): Promise<StoreProducts> {
    const query = this.productQuery.select('retailer_product_view as p');

    if (category) await this.productQuery.byCategorySlug(query, category);
    else if (type) await this.productQuery.byCategorySlug(query, type);

    if (searchText) this.productQuery.byText(query, searchText);

    query.andWhere((builder: any) => {
      builder.andWhere((innerBuilder: any) => {
        innerBuilder.whereNull('store_id').orWhere('store_id', '=', store_id);
      });
    });

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new StoreProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );
        product.id = getUuid(`${store_id}-${dbProduct.product_size_id}`);
        product.image = '';
        if (dbProduct.gallery && dbProduct.gallery.length > 0) {
          product.image = `https://s3.amazonaws.com/bottlemarket.images/${dbProduct.gallery[0]}`;
        }
        product.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];

        return product;
      });

    const count = dbProducts.length > 0 ? dbProducts[0].count : 0;

    return {
      items: dbProducts,
      totalCount: count,
      hasMore: offset + limit < count,
    };
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => StoreProductDTO)
  async storeProduct(@Args('id', { type: () => String }) id: string) {
    const dbRow = await this.knex('retailer_product_view as p')
      .first(
        'id',
        'title',
        'gallery',
        'description',
        'price',
        'price_retail',
        'quantity'
      )
      .where('id', '=', id);

    const product = new StoreProductDTO();
    Object.keys(dbRow).forEach((key) => ((product as any)[key] = dbRow[key]));
    product.gallery = [];
    if (dbRow.gallery) {
      for (let image of dbRow.gallery) {
        const gallery = new Gallery();
        gallery.url = `https://s3.amazonaws.com/bottlemarket.images/${image}`;
        product.gallery.push(gallery);
      }
      product.image = product.gallery[0].url;
    }

    return product;
  }

  @Mutation(() => StoreProductDTO, {
    description: 'Change availability of a given product within the store',
  })
  async changeProductAvailability(
    @Args('availabilityInput') availabilityInput: ChangeProductAvailability
  ): Promise<StoreProductDTO> {
    const storeProduct = await this.repository.load(availabilityInput.id);

    storeProduct.changeAvailability(
      availabilityInput.store_id,
      availabilityInput.product_size_id,
      availabilityInput.price,
      availabilityInput.quantity
    );
    storeProduct.commit();

    let dto = new StoreProductDTO();
    Object.keys(storeProduct).forEach(
      (key) => ((dto as StoreProductDTO)[key] = storeProduct[key])
    );

    return dto;
  }
}
