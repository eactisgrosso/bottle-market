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

let rawdata = fs.readFileSync("./author_table_data.json");
let authors = JSON.parse(rawdata);

const insert = async (author) => {
  await knex("author").insert({
    id: uuidv4(),
    legacy_id: author.id,
    name: author.name,
    country: author.country,
    slug: author.slug,
  });
};

for (const author of authors) {
  console.log(author);

  insert(author);
}

console.log("\r\n DONE");
