CREATE TABLE `marketplace_product_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `size` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `marketplace_product_size_unique` UNIQUE (`product_id`,`size`),
  CONSTRAINT `marketplace_product_size_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `marketplace_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;