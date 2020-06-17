CREATE TABLE product_size (
  id uuid primary key,
  product_id uuid NOT NULL REFERENCES product (id),
  size smallint NOT NULL,
  price_retail DECIMAL(8,2), 
  UNIQUE (product_id, size)
)
