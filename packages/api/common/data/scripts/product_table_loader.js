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

const { v4: uuidv4 } = require("uuid");

let rawdata = fs.readFileSync("./product_table_data.json");
let products = JSON.parse(rawdata);

const insert = async (product) => {
  await knex("product").insert(product);
};

const IdMap = async (table) => {
  const result = await knex(table).select("legacy_id", "id");
  return new Map(result.map((i) => [i.legacy_id, i.id]));
};

IdMap("author").then((authorMap) => {
  IdMap("region").then((regionMap) => {
    IdMap("producer").then((producerMap) => {
      for (const product of products) {
        product.author_id = authorMap.get(product.author_id);
        product.region_id = regionMap.get(product.region_id);
        product.producer_id = producerMap.get(product.producer_id);

        product.legacy_id = product.id;
        product.id = uuidv4();
        product._json = null;
        console.log(product);

        insert(product);
      }
    });
  });
});

console.log("\r\n DONE");
