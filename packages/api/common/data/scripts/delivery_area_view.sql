CREATE VIEW `marketplace_delivery_area_view` AS 
SELECT
	 BIN_TO_UUID(user_id) as user_id,
	 BIN_TO_UUID(da.id) as id,
     da.name,
     BIN_TO_UUID(store_id) as store_id,
     st.name as store,
     address,
     ST_X(centroid) as lat,
	 ST_Y(centroid) as lng,
     radius,
     eta,
	 monday, 
     monday_hours_from, 
     monday_hours_to, 
     tuesday, 
     tuesday_hours_from, 
     tuesday_hours_to, 
     wednesday, 
     wednesday_hours_from, 
     wednesday_hours_to, 
     thursday, 
     thursday_hours_from, 
     thursday_hours_to, 
     friday, 
     friday_hours_from, 
     friday_hours_to, 
     saturday, 
     saturday_hours_from, 
     saturday_hours_to, 
     sunday, 
     sunday_hours_from, 
     sunday_hours_to     
     
FROM marketplace_delivery_area da

LEFT JOIN marketplace_store st
ON st.id = da.store_id