import db from '../../database/connection.js';

export const load = async ({ cookies, locals }) => {
    // const sessionId = cookies.get('session_id');

    // if (sessionId) {
    //     const rows = await db.all('SELECT id, email FROM users WHERE id = ?', [sessionId]);
    //     console.log(rows)
    //     if (rows.length > 0) {
    //         locals.user = rows[0];
    //     } else {
    //         locals.user = null;
    //     }
    // } else {
    //     locals.user = null;
    //     console.log("no session id")
    // }

    // return resolve(event);

};