CREATE VIEW category_tree_view AS 
WITH RECURSIVE category_path (id, title, slug, path) AS
(
  SELECT id, title, slug, CAST(slug AS text) as path
    FROM category
	  WHERE id NOT IN (SELECT from_category_id FROM category_parent)        
  UNION ALL
  SELECT cat.id, cat.title, cat.slug, CONCAT(cpath.path, ' > [', cat.slug, ']')
    FROM category_path AS cpath 
    
    JOIN category_parent AS parent
	  ON cpath.id = parent.to_category_id

    JOIN category AS cat
    ON cat.id = parent.from_category_id
)
SELECT * FROM category_path;