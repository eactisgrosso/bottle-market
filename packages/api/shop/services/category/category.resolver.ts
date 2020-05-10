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
    const query = this.knex("marketplace_category_tree_view")
      .where("path", "like", `%[catalogo-publico]%`)
      .andWhere("path", "like", `%[${type}]%`);

    const dbCategories = await query.map(function (dbCategory: any) {
      let category = new Category();
      Object.keys(dbCategory).forEach(
        (key) => ((category as any)[key] = dbCategory[key])
      );
      category.icon = type
        ? type.charAt(0).toUpperCase() + type.slice(1)
        : "Vinos";
      category.type = type;
      category.children = [];

      return category;
    });

    let categoryMap = Object.assign(
      {},
      ...dbCategories.map((x: any) => ({ [`[${x.slug}]`]: x }))
    );

    let parent;
    for (let dbCategory of dbCategories) {
      if (dbCategory.slug === type) {
        parent = dbCategory;
        continue;
      }

      const slugs = dbCategory.path.split(" > ");
      const parentCategory = categoryMap[slugs[slugs.length - 2]];
      parentCategory.children.push(dbCategory);
    }

    return parent.children;
  }

  @Query(() => Category)
  async category(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Category | undefined> {
    return await this.items.find((item) => item.id === id);
  }
}
