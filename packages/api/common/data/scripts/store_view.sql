CREATE VIEW store_view AS 
SELECT
	user_id,
	s.id,
    s.name,
    store_type,
    street,
    st.name as state,
    ct.name as city,
    (SELECT COUNT(da.id) from delivery_area as da where da.store_id = s.id ) as delivery_areas,
    (SELECT COUNT(sp.product_size_id) from store_product as sp where sp.store_id = s.id) as products
FROM store s

LEFT JOIN state st
ON s.state_id = st.id

LEFT JOIN city ct
ON s.city_id = ct.id