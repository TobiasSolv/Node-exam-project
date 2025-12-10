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
db.exec(`DROP TABLE IF EXISTS sessions;`);
db.exec(`DROP TABLE IF EXISTS tickets;`);
db.exec(`DROP TABLE IF EXISTS ticket_comments;`);

// DDL
db.exec(`
CREATE TABLE if NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE if NOT EXISTS sessions (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    expires_at TEXT NOT NULL
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
db.exec(`
    INSERT INTO users (email, password, is_verified) VALUES ('12@12', '$2b$10$9PdN3K.HzkKYBPwDm5C7X.KW9.zqgJUuOsBXQOGCBHDrnSaoRjrGy', '1');
    INSERT INTO tickets (status, priority, title, body) VALUES ('in progress', 'low', 'render kanban board', 'work in progress 1');
    INSERT INTO tickets (status, priority, title, body) VALUES ('ready', 'low', 'change ticket database field types', 'work in progress 2');
    INSERT INTO tickets (status, priority, title, body) VALUES ('backlog', 'low medium', 'change ticket status on website', 'this should work as a dropdown and as drag and drop 3');
    INSERT INTO tickets (status, priority, title, body) VALUES ('backlog', 'high', 'change title and body on website', 'this should work as a edit button on the ticket page 4');
    INSERT INTO tickets (status, priority, title, body) VALUES ('ready', 'high', 'make kanban page pretty useing css', 'there should be boxes 5');
    INSERT INTO tickets (status, priority, title, body) VALUES ('ready', 'high', 'create ticket page', 'it should be svelte page and the auth should be copied from kanban page 6');
    INSERT INTO tickets (status, priority, title, body) VALUES ('backlog', 'high', 'create ticket modal', 'it should be svelte modal 7');
    INSERT INTO tickets (status, priority, title, body) VALUES ('ready', 'medium', 'fix so failded login is accesse denied', 'it should be for kanban page, logged in page and ticket page 8');
    INSERT INTO tickets (status, priority, title, body) VALUES ('backlog', 'high', 'change session cookies to JWT', 'work in progress 9');
    INSERT INTO tickets (status, priority, title, body) VALUES ('backlog', 'high', 'password reset is insecure', 'missing reset token database tabel 10');
`)
// DML
