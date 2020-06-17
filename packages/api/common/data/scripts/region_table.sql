CREATE TABLE region (
  id uuid primary key,
  title varchar(40) NOT NULL,
  slug varchar(50) NOT NULL,
  _json text NOT NULL,
  parent_id uuid DEFAULT NULL REFERENCES region (id),
  unique (slug)
);