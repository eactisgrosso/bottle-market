CREATE VIEW `marketplace_store_product_size_view` AS 
SELECT 
        BIN_TO_UUID(mps.id) as id,
        BIN_TO_UUID(msp.store_id) as store_id,
		mp.id as product_id,
		mp.title,
        mp.slug,
        mp.description,
        mps.size,
        mps.price_retail as price,
		GROUP_CONCAT(DISTINCT pc.category_id SEPARATOR ',') as categories,
		GROUP_CONCAT(DISTINCT CONCAT("[",mp.slug,"]") SEPARATOR ',') as categoriesSlugs,
		GROUP_CONCAT(DISTINCT pi.image SEPARATOR ',') as images
        
FROM marketplace_store_product msp

LEFT JOIN marketplace_product_size mps
ON msp.product_size_id = mps.id

LEFT JOIN marketplace_product mp
ON mps.product_id = mp.aggregateId

LEFT JOIN marketplace_product_categories as pc
ON mp.id = pc.product_id

LEFT JOIN marketplace_productimage as pi
ON mp.id = pi.product_id

GROUP BY store_id, product_id, product_size_id