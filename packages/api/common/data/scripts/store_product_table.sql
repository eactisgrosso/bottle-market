CREATE TABLE store_product (
  id uuid primary key,
  store_id uuid references store (id),
  product_size_id uuid references product_size (id),
  price decimal(8,2),
  quantity smallint, 
  date_added timestamp,
  unique (store_id,product_size_id)
);