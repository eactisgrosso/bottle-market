CREATE VIEW `product_view` AS 
SELECT  p.id,
        p.title,
        p.slug,
        p.description,
        p.package_size as size,
        p.price_retail as price,
        p.promo_discount as discountInPercent,
        p.producer_id,
        pro.title as producer,
        p.region_id,
        re.path as region,
		GROUP_CONCAT(DISTINCT pc.category_id SEPARATOR ',') as categories,
		GROUP_CONCAT(DISTINCT CONCAT("[",mk.slug,"]") SEPARATOR ',') as categoriesSlugs,
		GROUP_CONCAT(DISTINCT pi.image SEPARATOR ',') as images
       
FROM product p

LEFT JOIN product_categories as pc
ON p.id = pc.product_id

LEFT JOIN category mk
ON pc.category_id = mk.id

LEFT JOIN product_image as pi
ON p.id = pi.product_id

LEFT JOIN producer pro
ON p.producer_id = pro.id

INNER JOIN region_view re
ON p.region_id = re.id
 
GROUP BY p.id, re.path