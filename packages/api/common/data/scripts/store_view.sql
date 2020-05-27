CREATE VIEW `marketplace_store_view` AS 
SELECT
	BIN_TO_UUID(user_id) as user_id,
	BIN_TO_UUID(ms.id) as id,
    ms.name,
    type,
    street,
    postalcode,
    st.name as state,
    ct.name as city   
FROM bottlehub.marketplace_store ms

LEFT JOIN bottlehub.marketplace_state st
ON ms.state_id = st.id

LEFT JOIN bottlehub.marketplace_city ct
ON ms.city_id = ct.id
