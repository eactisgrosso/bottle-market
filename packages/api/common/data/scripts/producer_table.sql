
CREATE TABLE producer (
  id uuid primary key,
  title varchar(255) NOT NULL,
  description text,
  date_last_modified timestamp NOT NULL,
  site_url varchar(200),
  slug varchar(50) NOT NULL,
  email varchar(255),
  logo varchar(100),
  region_id uuid REFERENCES region (id),
  telephone varchar(30),
  city varchar(50),
  country varchar(2),
  state varchar(50),
  address varchar(50),
  zip varchar(15),
  is_listable smallint,
  unique (slug)
)
