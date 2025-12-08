import db from '../../database/connection.js';

export const handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session_id');

    if (sessionId) {
        const rows = await db.all('SELECT id, email FROM users WHERE id = ?', [sessionId]);
        console.log(rows)
        if (rows.length > 0) {
            event.locals.user = rows[0];
        } else {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
        console.log("no session id")
    }

    return resolve(event);

};