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

let rawdata = fs.readFileSync("./user_table_data.json");
let users = JSON.parse(rawdata);

const dropParentConstraint = async () => {
  await knex.schema.table("user", function (table) {
    table.dropForeign("user_parent_id", "user_user_parent_id_fkey");
  });
};

const restoreParentConstraint = async () => {
  await knex.schema.table("user", function (table) {
    table
      .foreign("user_parent_id", "user_user_parent_id_fkey")
      .references("user.id");
  });
};

const insert = async (user) => {
  await knex("user").insert({
    id: user.id,
    authsub: user.authSub,
    legacy_id: user.legacy_id,
    last_login: user.last_login ? user.last_login : null,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    company: user.company,
    date_of_birth: user.date_of_birth ? user.date_of_birth : null,
    date_added: user.date_added ? user.date_added : null,
    date_last_modified: user.date_last_modified
      ? user.date_last_modified
      : null,
    genre: user.genre,
    nationality: user.nationality,
    cuit: user.cuit,
    phone: user.phone,
    address: `${user.address_street} ${user.address_street_number} ${user.address_apt}`,
    zip: user.address_zip,
    city: user.address_city,
    state: user.address_state,
    country: user.address_country,
    is_admin: user.is_admin,
    comments: user.comments,
    _json: "{}",
    type: user.type,
    company_title: user.company_title,
    slug: user.slug,
    logo: user.logo,
    site_url: user.site_url,
    is_enabled: user.is_enabled,
    user_parent_id: user.user_parent_id != 0 ? user.user_parent_id : null,
    company_position: user.company_position,
    comments_user: user.comments_user,
    is_active: user.is_active,
    media_companies: user.media_companies,
    media_format: user.media_format,
  });
};

let idMap = {};
for (const user of users) {
  const uid = uuidv4();
  idMap[user.id] = uid;
  user.legacy_id = user.id;
  user.id = uid;
}

dropParentConstraint().then(() => {
  for (const user of users) {
    user.user_parent_id = idMap[user.user_parent_id];
    console.log(user);
    insert(user);
  }
  restoreParentConstraint();
});

console.log("\r\n DONE");
