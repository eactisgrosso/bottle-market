
CREATE VIEW delivery_area_view AS 
SELECT
	user_id,
	da.id,
     da.name,
     store_id,
     st.name as store,
     address,
     geom,
     radius,
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
     
FROM delivery_area da

LEFT JOIN store st
ON st.id = da.store_id
