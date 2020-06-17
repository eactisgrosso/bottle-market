CREATE VIEW retailer_product_view AS 
SELECT  ps.id as id,
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
		p.categories,
		p.images
       
FROM product_size ps

LEFT JOIN product as p
ON ps.product_id = p.id

LEFT JOIN producer pro
ON p.producer_id = pro.id

INNER JOIN region_view re
ON p.region_id = re.id
 
GROUP BY ps.id, p.id, pro.title, re.path
