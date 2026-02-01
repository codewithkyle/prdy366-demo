-- name: SearchProductsByName :many
SELECT * FROM products
WHERE name LIKE ?
ORDER BY name, gtin;

-- name: SearchProductsByGTIN :many
SELECT * FROM products
WHERE gtin LIKE ?
ORDER BY gtin, name;
