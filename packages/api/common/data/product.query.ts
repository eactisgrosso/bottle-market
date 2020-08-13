export default class ProductQuery {
  constructor(private readonly knex: any) {}

  select = (
    table: string = 'product_view as p',
    fields: string[] = ['p.*']
  ) => {
    let s = [this.knex.raw('count(p.id) OVER() AS count')];
    if (fields) s.push(...fields);
    return this.knex(table).select(s);
  };

  bySlug = (query: any, slug: string) => {
    query.first('*').where('slug', slug);
  };

  byCategorySlug = async (query: any, category: string) => {
    if (!category) return;

    const childrenCategories = await this.knex('category_tree_view')
      .select('slug')
      .where('path', 'ilike', `%[catalogo-publico]%`)
      .andWhere('path', 'ilike', `%[${category}]%`);

    query.andWhere((builder: any) => {
      // builder.orWhereRaw(`? = ANY (categories)`, category);
      if (childrenCategories && childrenCategories.length > 0) {
        for (let childrenCategory of childrenCategories) {
          builder.orWhereRaw(`? = ANY (categories)`, childrenCategory.slug);
        }
      }
    });
  };

  byText = (query: any, text: string) => {
    if (!text) return;

    const terms = text.split(' ');
    query.andWhere((builder: any) => {
      for (let term of terms) {
        builder.andWhere((innerBuilder: any) => {
          innerBuilder
            .where('title', 'ilike', `%${term}%`)
            .orWhere('producer', 'ilike', `%${term}%`)
            .orWhere('region', 'ilike', `%${term}%`)
            .orWhere('description', 'ilike', `%${term}%`);
        });
      }
    });
  };

  sortByPrice = (query: any, criteria: string) => {
    if (!criteria) return;

    if (criteria === 'highestToLowest') {
      query.orderBy('price', 'desc');
    } else {
      query.orderBy('price');
    }
  };
}
