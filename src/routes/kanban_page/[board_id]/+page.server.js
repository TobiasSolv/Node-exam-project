import { redirect } from '@sveltejs/kit';
import db from '../../../../database/connection.js';
import { goto } from '$app/navigation';


export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete('session_id', { path: '/' });
        throw redirect(302, '/front_page');
    },
    move: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        const status = form.get('status');

        await db.run('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);

        return { success: true };
    }
};

export const load = async ({ locals, cookies, params }) => {
    const sessionId = cookies.get('session_id');
    console.log(sessionId)

    const rows = await db.all('SELECT users.* FROM sessions LEFT JOIN users ON sessions.user_id = users.id WHERE sessions.key = ?', [sessionId]);

    const boards = await db.all('SELECT * FROM boards WHERE id = ?', [params.board_id]);

    const tickets = await db.all('SELECT * FROM tickets WHERE board_id = ?', [params.board_id]);

    console.log("DB rows kanban page:", rows);
    console.log("tickests: ", tickets)

    if (rows.length === 0) {
        // return fail(401, { message: 'Invalid email or password' });
    }

    if (boards.length === 0) {
        // return fail(401, { message: 'Invalid board' });
    }

    const user = rows[0];
    const board = boards[0]



    // check om der er en session i databasen
    // hvis der er en seesion i databasen skal man hente bruger objected til sessionen 

    // if (!locals.user) {
    //     throw redirect(302, '/login_form');
    // }

    return {
        user,
        board,
        tickets
    };
};
