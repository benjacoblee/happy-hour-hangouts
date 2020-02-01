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