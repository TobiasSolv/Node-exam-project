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
CREATE TABLE if NOT EXISTS tickets (
    id INTEGER PRIMARY KEY,
    status TEXT,
    priority TEXT,
    title TEXT,
    body TEXT,
    assignee TEXT,
    estimate INTEGER,
    created_at TEXT,
    closed_at TEXT    

);
CREATE TABLE if NOT EXISTS ticket_comments (
id INTEGER PRIMARY KEY,
ticket_id INTEGET NOT NULL
);
`);

// seeding
// DML
