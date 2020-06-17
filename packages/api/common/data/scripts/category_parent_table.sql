CREATE TABLE category_parent (
  from_category_id uuid NOT NULL REFERENCES category (id),
  to_category_id uuid NOT NULL REFERENCES category (id),
  unique (from_category_id,to_category_id)
);
