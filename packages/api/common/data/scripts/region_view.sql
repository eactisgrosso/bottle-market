CREATE VIEW `marketplace_region_view` AS 
WITH RECURSIVE region_path (id, title, path) AS
(
  SELECT id, title, CAST(title AS CHAR(1000)) as path
    FROM marketplace_region
    WHERE parent_id IS NULL
  UNION ALL
  SELECT r.id, r.title, CONCAT(rp.path, ' > ', r.title)
    FROM region_path AS rp JOIN marketplace_region AS r
      ON rp.id = r.parent_id
)
SELECT * FROM region_path
ORDER BY path;