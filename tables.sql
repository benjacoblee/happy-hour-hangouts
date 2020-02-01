CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT,
  salt TEXT,
  is_admin BOOL
);

CREATE TABLE IF NOT EXISTS bars (
  id SERIAL PRIMARY KEY,
  name TEXT,
  location TEXT,
  from_time TEXT,
  to_time TEXT,
  days TEXT,
  tags TEXT,
  details TEXT,
  url TEXT,
  user_id INTEGER
);

CREATE TABLE IF NOT EXISTS users_comments (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  date timestamptz,
  user_id integer,
  bar_id integer
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id integer,
  bar_id integer,
  UNIQUE (user_id, bar_id)
);

CREATE TABLE followers (id SERIAL PRIMARY KEY,
user_id INTEGER,
follower_id INTEGER, UNIQUE (user_id,follower_id));