CREATE TABLE city (
  id varchar(50) primary key,
  state_id varchar(50) REFERENCES state (id),
  name varchar(255),
  centroid point
)
