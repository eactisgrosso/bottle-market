CREATE VIEW store_product_view AS 
SELECT 
		sp.product_size_id as id,
        sp.store_id,
        COALESCE(sp.quantity,0) as quantity,
        sp.price,
		ps.size,
        ps.price_retail,
		p.id as product_id,
		p.title,
        p.slug,
        p.description,
	    p.categories,
		p.images
		
FROM store_product sp

LEFT JOIN product_size ps
ON sp.product_size_id = ps.id

LEFT JOIN product p
ON ps.product_id = p.id