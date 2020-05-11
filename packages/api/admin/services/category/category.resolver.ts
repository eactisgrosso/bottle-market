import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql";
import loadCategories from "../../data/category.data";
import Category from "./category.type";
import AddCategoryInput from "./category.input_type";

@Injectable()
@Resolver()
export default class CategoryResolver {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  private readonly categoriesCollection: Category[] = loadCategories();

  @Query((returns) => [Category], { description: "Get all the categories" })
  async categories(
    @Args("type", { nullable: true }) type?: string,
    @Args("searchBy", { defaultValue: "" }) searchBy?: string
  ): Promise<Category[]> {
    if (!type) type = "catalogo-publico";

    const query = this.knex("marketplace_category_tree_view")
      .where("path", "like", `%[${type}]%`)
      .andWhereNot("slug", type);

    const dbCategories = await query.map(function (dbCategory: any) {
      let category = new Category();
      category.id = dbCategory.id;
      category.slug = dbCategory.slug;
      category.name = dbCategory.title;

      const path = dbCategory.path.split(" > ");
      const parent = path[2].replace(/[[\]]/g, "");
      category.type = parent;
      category.icon =
        parent.charAt(0).toUpperCase() + parent.slice(1, parent.length);

      return category;
    });

    return dbCategories;
  }

  @Query((returns) => Category)
  async category(
    @Args("id", { type: () => ID }) id: string
  ): Promise<Category | undefined> {
    return await this.categoriesCollection.find(
      (category) => category.id === id
    );
  }

  @Mutation(() => Category, { description: "Create Category" })
  async createCategory(
    @Args("category") category: AddCategoryInput
  ): Promise<Category> {
    console.log(category, "category");

    return await category;
  }
}
