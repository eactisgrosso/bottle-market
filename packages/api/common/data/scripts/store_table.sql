CREATE TABLE store (
  id uuid primary key,
  user_id uuid references "user" (id),
  name varchar(255),
  street varchar(255),
  country_id varchar(2),
  state_id varchar(50) references state (id),
  city_id varchar(50) references city (id),
  store_type varchar(50),
  date_added timestamp
)
