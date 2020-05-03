import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import loadCategories from "./category.sample";
import Category from "./category.type";

@Resolver()
export class CategoryResolver {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  private readonly items: Category[] = loadCategories();

  @Query(() => [Category], { description: "Get all the categories" })
  async categories(
    @Args("type", { type: () => String }) type: string
  ): Promise<Category[]> {
    const dbCategories = await this.knex("marketplace_category").map(function (
      dbCategory: any
    ) {
      let category = new Category();
      Object.keys(dbCategory).forEach(
        (key) => ((category as any)[key] = dbCategory[key])
      );
      category.icon = "FruitsVegetable";
      category.type = "";
      category.children = [];

      return category;
    });

    let categoryMap = Object.assign(
      {},
      ...dbCategories.map((x: any) => ({ [x.id]: x }))
    );

    const categoryTree = await this.knex("marketplace_category_parent");
    for (let relation of categoryTree) {
      const child = categoryMap[relation.from_category_id];
      const parent = categoryMap[relation.to_category_id];

      if (parent.title === "CATALOGO PUBLICO") {
        child.type = child.title;
      }

      parent.children.push(child);
    }

    const publicCategories = dbCategories.filter(
      (item: Category) => item.type !== ""
    );
    const parent = publicCategories.find(
      (item: Category) => item.title === type
    );

    return parent.children;
  }

  @Query(() => Category)
  async category(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Category | undefined> {
    return await this.items.find((item) => item.id === id);
  }
}
