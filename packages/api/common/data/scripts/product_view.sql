CREATE VIEW `product_view` AS 
SELECT  p.id,
        p.title,
        p.slug,
        p.description,
        p.package_size as size,
        p.price_retail as price,
        p.promo_discount as discountInPercent,
        p.producer_id,
        p.images,
        p.categories,
        pro.title as producer,
        a.name as author,
        p.region_id,
        re.path as region
       
FROM product p

LEFT JOIN producer pro
ON p.producer_id = pro.id

LEFT JOIN author a
ON p.author_id = a.id

INNER JOIN region_view re
ON p.region_id = re.id
 
GROUP BY p.id, pro.title, a.name, re.path