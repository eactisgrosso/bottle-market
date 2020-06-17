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

let rawdata = fs.readFileSync("./category_table_data.json");
let categories = JSON.parse(rawdata);

const insert = async (category) => {
  await knex("category").insert(category);
};

for (const category of categories) {
  category.legacy_id = category.id;
  category.id = uuidv4();
  category._json = null;

  console.log(category);

  insert(category);
}

console.log("\r\n DONE");
