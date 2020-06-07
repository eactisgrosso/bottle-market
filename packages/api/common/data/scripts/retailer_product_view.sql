CREATE VIEW `retailer_product_view` AS 
SELECT  BIN_TO_UUID(ps.id) as id,
		p.id as product_id,
        p.title,
        p.slug,
        p.description,
        ps.size,
        ps.price_retail as price,
        p.promo_discount as discountInPercent,
        p.producer_id,
        pro.title as producer,
        p.region_id,
        re.path as region,
		GROUP_CONCAT(DISTINCT pc.category_id SEPARATOR ',') as categories,
		GROUP_CONCAT(DISTINCT CONCAT("[",mk.slug,"]") SEPARATOR ',') as categoriesSlugs,
		GROUP_CONCAT(DISTINCT pi.image SEPARATOR ',') as images
       
FROM product_size ps

LEFT JOIN product as p
ON ps.product_id = p.aggregateid

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
 
GROUP BY ps.id, p.id, re.path
