export default class ProductQuery {
  constructor(private readonly knex: any) {}

  create = () => {
    return this.knex("marketplace_product_view as p").select("*");
  };

  createCount = () => {
    return this.knex("marketplace_product_view as p").count("id as count");
  };

  bySlug = (query: any, slug: string) => {
    query.first("*").where("slug", slug);
  };

  byCategorySlug = async (query: any, category: string) => {
    if (!category) return;

    const childrenCategories = await this.knex("marketplace_category_tree_view")
      .select("slug")
      .where("path", "like", `%[catalogo-publico]%`)
      .andWhere("path", "like", `%[${category}]%`);

    if (childrenCategories && childrenCategories.length > 0) {
      query.andWhere((builder: any) => {
        for (let childrenCategory of childrenCategories) {
          builder.orWhere(
            "categoriesSlugs",
            "like",
            `%[${childrenCategory.slug}]%`
          );
        }
      });
    }
  };

  byText = (query: any, text: string) => {
    if (!text) return;

    const terms = text.split(" ");
    query.andWhere((builder: any) => {
      for (let term of terms) {
        builder.andWhere((innerBuilder: any) => {
          innerBuilder
            .where("title", "like", `%${term}%`)
            .orWhere("producer", "like", `%${term}%`)
            .orWhere("region", "like", `%${term}%`)
            .orWhere("description", "like", `%${term}%`);
        });
      }
    });
  };

  sortByPrice = (query: any, criteria: string) => {
    if (!criteria) return;

    if (criteria === "highestToLowest") {
      query.orderBy("price", "desc");
    } else {
      query.orderBy("price");
    }
  };
}
