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

let rawdata = fs.readFileSync("./producer_table_data.json");
let producers = JSON.parse(rawdata);

const IdMap = async (table) => {
  const result = await knex(table).select("legacy_id", "id");
  return new Map(result.map((i) => [i.legacy_id, i.id]));
};

const insert = async (producer) => {
  await knex("producer").insert({
    id: uuidv4(),
    legacy_id: producer.id,
    title: producer.title,
    description: producer.description,
    date_last_modified: producer.date_last_modified,
    site_url: producer.site_url,
    slug: producer.slug,
    email: producer.email,
    logo: producer.logo,
    region_id: producer.region_id,
    telephone: producer.telephone,
    address: `${producer.address_street} ${producer.address_street_number} ${producer.address_apt}`,
    city: producer.address_city,
    country: producer.address_country,
    state: producer.address_state,
    zip: producer.address_zip,
    is_listable: producer.is_listable,
  });
};

IdMap("region").then((regionMap) => {
  for (const producer of producers) {
    producer.region_id = regionMap.get(producer.region_id);

    console.log(producer);

    insert(producer);
  }
});

console.log("\r\n DONE");
