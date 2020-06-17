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

const insert = async (product) => {
  await knex("product_size").insert({
    id: uuidv4(),
    product_id: product.id,
    size: 750,
    price_retail: product.price_retail,
  });
};

knex("product")
  .select("id", "price_retail")
  .then((response) => {
    for (let product of response) {
      console.log(product);
      insert(product);
    }
  });

console.log("\r\n DONE");
