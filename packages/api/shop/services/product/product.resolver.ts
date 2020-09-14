import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import ProductDTO, { ProductResponse } from './product.dto';
import { ProductType } from '../../../common/types/product.enum';
import Category from '../category/category.type';
import Gallery from '../../../common/types/gallery.type';
import ProductQuery from '../../../common/data/product.query';
@Injectable()
@Resolver()
export class ProductResolver {
  private productQuery: ProductQuery;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {
    this.productQuery = new ProductQuery(knex);
  }

  private async mapProduct(dbProduct: any, product: ProductDTO) {
    Object.keys(dbProduct).forEach(
      (key) => ((product as any)[key] = dbProduct[key])
    );

    product.gallery = [];
    product.image = '';
    if (dbProduct.images) {
      for (let image of dbProduct.images) {
        const gallery = new Gallery();
        gallery.url = `https://s3.amazonaws.com/bottlemarket.images/${image}`;
        product.gallery.push(gallery);
      }
      product.image = product.gallery[0].url;
    }

    product.salePrice = 0;
    product.categories = [];

    return product;
  }

  @Query((returns) => ProductResponse)
  async products(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
    @Args('type', { nullable: true }) type?: string,
    @Args('lat', { nullable: true }) lat?: number,
    @Args('lng', { nullable: true }) lng?: number,
    @Args('text', { nullable: true }) text?: string,
    @Args('category', { nullable: true }) category?: string
  ) {
    const address = lat && lat != 0 && lng && lng != 0;
    const fields = [
      'p.id',
      'p.title',
      'p.slug',
      'p.description',
      'p.size',
      'p.discountInPercent',
      'p.images',
      'p.categories',
    ];

    let query = this.productQuery.select(
      'product_view as p',
      address
        ? [
            ...fields,
            this.knex.raw('COALESCE(sp.price, p.price) as price'),
            'sp.quantity',
            'da.geom',
            this.knex.raw('ST_Distance(geom, ref_geom) AS distance'),
          ]
        : [...fields, 'p.price']
    );

    if (address) {
      query.leftJoin('product_size as ps', 'p.id', 'ps.product_id');
      query.leftJoin('store_product as sp', 'ps.id', 'sp.product_size_id');
      query.leftJoin('store as s', 'sp.store_id', 's.id');
      query.leftJoin('delivery_area as da', 's.id', 'da.store_id');
      query.crossJoin(
        this.knex.raw(
          `(select ST_MakePoint(${lng},${lat})::geography AS ref_geom) as r`
        )
      );
    }

    if (category) await this.productQuery.byCategorySlug(query, category);
    else if (type) await this.productQuery.byCategorySlug(query, type);

    if (text) this.productQuery.byText(query, text);

    if (address) {
      query
        .where('sp.quantity', '>', 0)
        .whereRaw(this.knex.raw('ST_DWithin(geom, ref_geom, radius * 1000)'))
        .orderBy('distance');

      const baseFields = [
        'id',
        'slug',
        'title',
        'description',
        'size',
        'price',
        'discountInPercent',
        'images',
        'categories',
      ];
      query = this.knex
        .with('nearby', query)
        .select(...baseFields)
        .min('distance')
        .from('nearby')
        .groupBy(...baseFields);
    }

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new ProductDTO();
        this.mapProduct(dbProduct, product);

        product.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];

        return product;
      });

    const count = dbProducts.length > 0 ? dbProducts[0].count : 0;
    return new ProductResponse({
      total: count,
      items: dbProducts,
      hasMore: offset + limit < count,
    });
  }

  @Query((returns) => ProductDTO)
  async product(@Args('slug', { type: () => String }) slug: string) {
    const query = this.productQuery.select();
    this.productQuery.bySlug(query, slug);

    const dbProduct = await query;
    const product = new ProductDTO();
    this.mapProduct(dbProduct, product);

    const categories = await this.knex('category')
      .select('id', 'title', 'slug')
      .whereIn('slug', dbProduct.categories);

    for (let dbCategory of categories) {
      let category = new Category();
      category.id = dbCategory.id;
      category.slug = dbCategory.slug;
      category.title = dbCategory.title;
      category.children = [];
      category.icon = '';
      product.categories.push(category);
    }

    product.type = ProductType.vino;

    return product;
  }

  // @Query(() => [ProductDTO], { description: "Get the Related products" })
  // async relatedProducts(
  //   @Args("slug", { type: () => String }) slug: string,
  //   @Args("type", { nullable: true }) type?: string
  // ): Promise<any> {
  //   return null;
  // }
}
