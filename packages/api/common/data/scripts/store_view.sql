CREATE VIEW `store_view` AS 
SELECT
	BIN_TO_UUID(user_id) as user_id,
	BIN_TO_UUID(ms.id) as id,
    ms.name,
    store_type,
    street,
    st.name as state,
    ct.name as city,
    COUNT(da.id) as delivery_areas,
    COUNT(sp.product_size_id) as products
FROM store ms

LEFT JOIN state st
ON ms.state_id = st.id

LEFT JOIN city ct
ON ms.city_id = ct.id

LEFT JOIN delivery_area da
ON da.store_id = ms.id

LEFT JOIN store_product sp
ON sp.store_id = ms.id

GROUP BY ms.id