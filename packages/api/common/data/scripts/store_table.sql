CREATE TABLE `store` (
  `id` binary(16),
  `user_id` binary(16),
  `type` varchar(50),
  `name` varchar(255),
  `country_id` varchar(2), 
  `state_id` int, 
  `city_id` int,
  `street` varchar(255),
  `postalcode` varchar(50)
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
