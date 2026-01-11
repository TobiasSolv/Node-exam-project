import { redirect } from '@sveltejs/kit';
import db from '../../../../database/connection.js';

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete('session_id', { path: '/' });
        cookies.delete('access_token', { path: '/' });
        throw redirect(302, '/front_page');
    },
    move: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        const status = form.get('status');

        await db.run('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);

        return { success: true };
    },
    delete: async ({ request, params }) => {
        const form = await request.formData();
        const id = form.get('id');
        const board_id = params.board_id;

        await db.run('DELETE FROM tickets WHERE board_id = ? AND id = ?', [board_id, id]);

        return { success: true };

    },
    update: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        const title = form.get('title');
        const priority = form.get('priority');

        await db.run(
            'UPDATE tickets SET title = ?, priority = ? WHERE id = ?',
            [title, priority, id]
        );

        return { success: true };
    }
};

export const load = async ({ cookies, params }) => {
    const sessionId = cookies.get('session_id');

    const rows = await db.all('SELECT users.* FROM sessions LEFT JOIN users ON sessions.user_id = users.id WHERE sessions.key = ?', [sessionId]);
    const boards = await db.all('SELECT * FROM boards WHERE id = ?', [params.board_id]);
    const tickets = await db.all('SELECT * FROM tickets WHERE board_id = ?', [params.board_id]);

    const user = rows[0];
    const board = boards[0]

    return {
        user,
        board,
        tickets
    };
};
