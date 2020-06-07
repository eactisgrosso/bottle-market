CREATE TABLE `store_product` (
  `store_id` BINARY(16),
  `product_size_id` BINARY(16),
  `price` DECIMAL(8,2),
  `quantity` INT, 
  `date_added` datetime(6),
  PRIMARY KEY (`store_id`,`product_size_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;