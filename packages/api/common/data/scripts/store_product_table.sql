CREATE TABLE `marketplace_store_product` (
  `store_id` BINARY(16),
  `product_size_id` BINARY(16),
  PRIMARY KEY (`store_id`,`product_size_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;