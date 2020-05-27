CREATE TABLE `city` (
  `id` varchar(50),
  `state_id` varchar(50),
  `name` varchar(255),
  `centroid` POINT, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
