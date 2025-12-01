import db from './connection.js';

// db.all   for SELECT
// db.run   for INSERT, UPDATE, DELETE
// db.exec  run DDL and DCL against the database without parameters

/*
Conventions for SQL
use lowercase
use snake case
use plural for tables
*/

db.exec(`DROP TABLE IF EXISTS users;`);

// DDL
db.exec(`
CREATE TABLE if NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified INTEGER NOT NULL DEFAULT 0
);
`);

// seeding
// DML
db.run(`INSERT INTO users (email, password) VALUES ('something@outlook.dk', 'pAssWOrd#321')`);
db.run(`INSERT INTO users (email, password) VALUES ('sometg@outlook.dk', 'pAssWd#321')`);