CREATE TABLE `marketplace_product_size` (
  `id` BINARY(16),
  `product_id` BINARY(16) NOT NULL,
  `size` int NOT NULL,
  `price_retail` DECIMAL(8,2), 
  PRIMARY KEY (`id`),
  CONSTRAINT `marketplace_product_size_unique` UNIQUE (`product_id`,`size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;