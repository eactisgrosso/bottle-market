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

let rawdata = fs.readFileSync("./region_table_data.json");
let regions = JSON.parse(rawdata);

const dropParentConstraint = async () => {
  await knex.schema.table("region", function (table) {
    table.dropForeign("parent_id", "region_parent_id_fkey");
  });
};

const restoreParentConstraint = async () => {
  await knex.schema.table("region", function (table) {
    table.foreign("parent_id", "region_parent_id_fkey").references("region.id");
  });
};

const insert = async (region) => {
  await knex("region").insert(region);
};

let idMap = {};
for (const region of regions) {
  const uid = uuidv4();
  idMap[region.id] = uid;
  region.legacy_id = region.id;
  region.id = uid;
}

dropParentConstraint();
for (const region of regions) {
  region.parent_id = idMap[region.parent_id];
  console.log(region);
  insert(region);
}
restoreParentConstraint();

console.log("\r\n DONE");
