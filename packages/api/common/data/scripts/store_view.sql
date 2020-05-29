CREATE VIEW `store_view` AS 
SELECT
	BIN_TO_UUID(user_id) as user_id,
	BIN_TO_UUID(ms.id) as id,
    ms.name,
    store_type,
    street,
    st.name as state,
    ct.name as city   
FROM store ms

LEFT JOIN state st
ON ms.state_id = st.id

LEFT JOIN city ct
ON ms.city_id = ct.id
