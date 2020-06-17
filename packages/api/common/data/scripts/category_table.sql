CREATE TABLE category (
  id uuid primary key,
  title varchar(255) NOT NULL,
  _json json,
  slug varchar(50) NOT NULL,
  is_public smallint DEFAULT 1,
  description text,
  unique (slug)
);