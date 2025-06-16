DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS pet_status;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS shop_inventory;
DROP TABLE IF EXISTS pet_items;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  coins INT DEFAULT 0
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR (15),
  status BOOLEAN DEFAULT TRUE,
  birthday DATE
);

CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR (30),
  bank INT
);

CREATE TABLE pet_status (
  pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  hunger INT CHECK (hunger BETWEEN 0 AND 50),
  last_fed_at TIMESTAMP,
  cleanliness INT CHECK (cleanliness BETWEEN 0 AND 50),
  last_cleaned_at TIMESTAMP,
  happiness INT CHECK (happiness BETWEEN 0 AND 50),
  last_played_at TIMESTAMP,
  energy INT CHECK (energy BETWEEN 0 AND 50),
  last_slept_at TIMESTAMP,
  heatlh INT CHECK (health BETWEEN 0 AND 50)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR (30) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  price INT
);

CREATE TABLE shop_inventory (
  shop_id INT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  PRICE INT
);

CREATE TABLE pet_items (
  pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quanitity INT DEFAULT 0
);
