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
  details TEXT,
  url TEXT,
  user_id INTEGER
);