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

let rawdata = fs.readFileSync("./product_image_table_data.json");
let productImages = JSON.parse(rawdata);

const IdMap = async (table) => {
  const result = await knex(table).select("legacy_id", "id");
  return new Map(result.map((i) => [i.legacy_id, i.id]));
};

const update = async (product_id, images) => {
  await knex("product").where({ id: product_id }).update({
    images: images,
  });
};

IdMap("product").then((productMap) => {
  for (const productImage of productImages) {
    const product_id = productMap.get(productImage.product_id);
    const images = [productImage.image];

    update(product_id, images);
  }
});

console.log("\r\n DONE");
