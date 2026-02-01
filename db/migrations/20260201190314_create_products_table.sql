-- migrate:up
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name text NOT NULL,
    gtin text NOT NULL
);

-- migrate:down
DROP TABLE products;
