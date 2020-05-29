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
  await knex("city").insert({
    id: id,
    state_id,
    name: name,
    centroid: point,
  });
};

for (const city of cities.localidades) {
  console.log(city);
  if (city.id == "06497060004") continue;

  insert(
    city.id,
    city.provincia.id,
    `${city.nombre[0].toUpperCase()}${city.nombre.slice(1).toLowerCase()}`,
    city.centroide.lat,
    city.centroide.lon
  );
}

console.log("\r\n DONE");
