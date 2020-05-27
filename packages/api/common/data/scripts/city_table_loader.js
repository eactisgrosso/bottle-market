"use strict";

const fs = require("fs");
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "bottlehub",
  },
});

let rawdata = fs.readFileSync("./city_table_data.json");
let cities = JSON.parse(rawdata);

const insert = async (id, state_id, name, lat, lng) => {
  const point = knex.raw("POINT(:lat,:lat)", { lat: lat, lng: lng });
  await knex("marketplace_city").insert({
    id: id,
    state_id,
    name: name,
    centroid: point,
  });
};

for (const city of cities.localidades) {
  insert(
    city.id,
    city.provincia.id,
    city.nombre,
    city.centroide.lat,
    city.centroide.lon
  );
  console.log(city);
}

console.log("\r\n DONE");
