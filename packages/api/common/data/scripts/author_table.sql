CREATE TABLE author (
  id uuid primary key,
  name varchar(255) NOT NULL,
  country varchar(2) NOT NULL,
  slug varchar(50) NOT NULL,
  unique (slug)
);
