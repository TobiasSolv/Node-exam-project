import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const connection = await open({
    filename: "login.db",
    driver: sqlite3.Database
});

export default connection;

// mixed sqlite 3 and sqlite, that was the reason it did not work.
// used sqlite's Promise-based wrapper (open(...))
// But then calling connection.all() as if it were the callback-style sqlite3 API
//The sqlite package already returns promises, and does not use callbacks at all.

// export function dbQuery(sql, params) {
//     return new Promise((resolve, reject) => {
//         connection.all(sql, params, (err, rows) => {
//             if (err) reject(err);
//             else resolve(rows);
//         });
//     });
// }
