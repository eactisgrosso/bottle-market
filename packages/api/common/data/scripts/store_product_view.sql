CREATE VIEW `store_product_view` AS 
SELECT 
        BIN_TO_UUID(ps.id) as id,
        BIN_TO_UUID(sp.store_id) as store_id,
        COALESCE(sp.quantity,0) as quantity,
        sp.price,
		p.id as product_id,
		p.title,
        p.slug,
        p.description,
        ps.size,
        ps.price_retail,
		GROUP_CONCAT(DISTINCT pc.category_id SEPARATOR ',') as categories,
		GROUP_CONCAT(DISTINCT CONCAT("[",c.slug,"]") SEPARATOR ',') as categoriesSlugs,
		GROUP_CONCAT(DISTINCT pi.image SEPARATOR ',') as images
        
FROM store_product sp

LEFT JOIN product_size ps
ON sp.product_size_id = ps.id

LEFT JOIN product p
ON ps.product_id = p.aggregateId

LEFT JOIN product_categories as pc
ON p.id = pc.product_id

LEFT JOIN category c
ON pc.category_id = c.id

LEFT JOIN product_image as pi
ON p.id = pi.product_id

GROUP BY store_id, product_id, product_size_id