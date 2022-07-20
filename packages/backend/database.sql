CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhasH INT NOT NULL
);

INSERT INTO users (username, passhash) VALUES ();