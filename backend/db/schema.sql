
DROP TABLE IF EXISTS equipped_items;
DROP TABLE IF EXISTS pet_overall_stats;
DROP TABLE IF EXISTS pet_items;
DROP TABLE IF EXISTS shop_inventory;
DROP TABLE IF EXISTS coin_transactions;
DROP TABLE IF EXISTS pet_status;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS bank;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  coins_balance INT DEFAULT 10
);


CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  name VARCHAR(15),
  is_alive BOOLEAN DEFAULT TRUE,

  birthday DATE
);

-- central bank to hold/spend coins
CREATE TABLE bank (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  balance INT DEFAULT 0
);

-- coin transactions 
CREATE TABLE coin_transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  bank_id INT REFERENCES bank(id) ON DELETE CASCADE,
  amount INT, -- negative = user spent, positive = user earned
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE pet_status (

  pet_id INT PRIMARY KEY REFERENCES pets(id) ON DELETE CASCADE,
  hunger INT DEFAULT 50 CHECK (hunger BETWEEN 0 AND 50),
  last_fed_at TIMESTAMP,
  cleanliness INT DEFAULT 50 CHECK (cleanliness BETWEEN 0 AND 50),
  last_cleaned_at TIMESTAMP,
  happiness INT DEFAULT 50 CHECK (happiness BETWEEN 0 AND 50),
  last_played_at TIMESTAMP,
  energy INT DEFAULT 50 CHECK (energy BETWEEN 0 AND 50),
  last_slept_at TIMESTAMP,
  health INT DEFAULT 50 CHECK (health BETWEEN 0 AND 50),
  dead BOOLEAN DEFAULT FALSE

);

-- items for shop
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  price INT NOT NULL,
  type VARCHAR(15) CHECK (type IN ('food', 'clothing'))
);

-- shop inventory
CREATE TABLE shop_inventory (
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  price INT NOT NULL,
  PRIMARY KEY (item_id)
);

-- pet items 
CREATE TABLE pet_items (
  pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity INT DEFAULT 0,
  PRIMARY KEY (pet_id, item_id)
);

-- tracks equipped items 
CREATE TABLE equipped_items (
  pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES items(id),
  equipped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (pet_id, item_id)
);

-- stats recorded after death
CREATE TABLE pet_overall_stats (
  pet_id INT PRIMARY KEY REFERENCES pets(id) ON DELETE CASCADE,
  total_meals INT DEFAULT 0,
  total_baths INT DEFAULT 0,
  total_play_sessions INT DEFAULT 0,
  total_sleep_sessions INT DEFAULT 0,
  days_alive INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

