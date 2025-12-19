import { redirect } from '@sveltejs/kit';
import db from '../../../database/connection.js';

export const load = async ({ locals, cookies }) => {
    const sessionId = cookies.get('session_id');
    console.log(sessionId)

    const rows = await db.all('SELECT users.* FROM sessions LEFT JOIN users ON sessions.user_id = users.id WHERE sessions.key = ?', [sessionId]);

    const boards = await db.all('SELECT * FROM boards', []);

    console.log("DB rows kanban page:", rows);
    console.log("tickests: ", boards)

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
        user,
        boards
    };
};

export const actions = {
    addBoard: async ({ request }) => {
        const form = await request.formData();

        const name = form.get('name');
        const description = form.get('description');

        if (!name) {
            return { success: false };
        }

        await db.run(
            'INSERT INTO boards (name, description) VALUES (?, ?)',
            [name, description]
        );

        return { success: true };
    },

    deleteBoard: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');

        if (!id) return { success: false };

        // Optional: delete tickets belonging to the board first
        await db.run('DELETE FROM tickets WHERE board_id = ?', [id]);

        await db.run('DELETE FROM boards WHERE id = ?', [id]);

        return { success: true };
    }
};