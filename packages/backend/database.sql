CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhasH VARCHAR(255) NOT NULL,
    userid VARCHAR(255) NOT NULL UNIQUE

);

INSERT INTO users (username, passhash) VALUES ();