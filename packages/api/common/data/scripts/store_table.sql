CREATE TABLE `marketplace_store` (
  `id` BINARY(16),
  `user_id` BINARY(16),
  `name` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
