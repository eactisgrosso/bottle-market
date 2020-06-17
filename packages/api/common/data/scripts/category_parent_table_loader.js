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

let rawdata = fs.readFileSync("./category_parent_table_data.json");
let categoryRelations = JSON.parse(rawdata);

const insert = async (category_parent) => {
  await knex("category_parent").insert(category_parent);
};

const IdMap = async (table) => {
  const result = await knex(table).select("legacy_id", "id");
  return new Map(result.map((i) => [i.legacy_id, i.id]));
};

IdMap("category").then((map) => {
  for (const relation of categoryRelations) {
    relation.from_category_id = map.get(relation.from_category_id);
    relation.to_category_id = map.get(relation.to_category_id);
    console.log(relation);
    insert(relation);
  }
});

console.log("\r\n DONE");
