import { redirect } from '@sveltejs/kit';
import db from '../../../database/connection.js';

export const actions = {
    default: async ({ cookies }) => {
        cookies.delete('session_id', { path: '/' });
        throw redirect(302, '/login_form');
    }
};

export const load = async ({ locals, cookies }) => {
    const sessionId = cookies.get('session_id');
    console.log(sessionId)

    const rows = await db.all('SELECT users.* FROM sessions LEFT JOIN users ON sessions.user_id = users.id WHERE sessions.key = ?', [sessionId]);

    console.log("DB rows kanban page:", rows);

    if (rows.length === 0) {
        // return fail(401, { message: 'Invalid email or password' });
    }

    const user = rows[0];

    // check om der er en session i databasen
    // hvis der er en seesion i databasen skal man hente bruger objected til sessionen 

    // if (!locals.user) {
    //     throw redirect(302, '/login_form');
    // }

    return {
        user
    };
};
