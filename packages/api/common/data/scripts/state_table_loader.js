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

let rawdata = fs.readFileSync("./state_table_data.json");
let states = JSON.parse(rawdata);

const insert = async (id, name, lat, lng) => {
  const point = knex.raw("POINT(:lat,:lng)", { lat: lat, lng: lng });
  await knex("state").insert({
    id: id,
    name: name,
    centroid: point,
  });
};

for (const state of states.provincias) {
  insert(state.id, state.nombre, state.centroide.lat, state.centroide.lon);
  console.log(state);
}

console.log("\r\n DONE");
