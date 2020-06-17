"use strict";

const fs = require("fs");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "eactisgrosso",
    database: "postgres",
  },
});

let rawdata = fs.readFileSync("./product_category_table_data.json");
let productCategories = JSON.parse(rawdata);

const update = async (product_id, categories) => {
  await knex("product").where({ id: product_id }).update({
    categories: categories,
  });
};

const IdMap = async (table, field = "id") => {
  const result = await knex(table).select("legacy_id", field);
  return new Map(result.map((i) => [i.legacy_id, i[field]]));
};

IdMap("product").then((productMap) => {
  IdMap("category", "slug").then((categoryMap) => {
    let map = {};
    for (const productCategory of productCategories) {
      const product_id = productMap.get(productCategory.product_id);
      const category_slug = categoryMap.get(productCategory.category_id);

      let categories = map[product_id];
      if (!categories) categories = [];
      categories.push(category_slug);

      map[product_id] = categories;
    }

    for (let key in map) {
      update(key, map[key]);
      console.log(`product_id:${key} categories:${map[key]}`);
    }
  });
});

console.log("\r\n DONE");
