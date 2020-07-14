
CREATE VIEW retailer_product_view AS 
SELECT  COALESCE(sp.id, ps.id) as id,
		sp.store_id,
		ps.id as product_size_id,
		COALESCE(sp.price, 0.00) as price,
        COALESCE(sp.quantity, -1) as quantity,		
		p.id as product_id,
        p.title,
        p.slug,
        p.description,
        ps.size,
        ps.price_retail,
        p.promo_discount,
        p.producer_id,
        pro.title as producer,
        p.region_id,
        re.path as region,
		p.categories,
		p.images as gallery
       
FROM product_size ps

LEFT JOIN product as p
ON ps.product_id = p.id

LEFT JOIN producer pro
ON p.producer_id = pro.id

INNER JOIN region_view re
ON p.region_id = re.id
 
LEFT JOIN store_product sp
ON ps.id = sp.product_size_id

GROUP BY sp.id, ps.id, p.id, pro.title, re.path, sp.quantity, sp.store_id

ORDER BY quantity DESC

