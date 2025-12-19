import { redirect, fail } from '@sveltejs/kit';
import db from '../../../../database/connection.js';

const allowedStatuses = [
    'backlog',
    'ready',
    'in progress',
    'in review',
    'blocked',
    'done'
];

export const actions = {
    add: async ({ request, params }) => {
        const formData = await request.formData();

        let status = formData.get('status')?.toLowerCase().trim();
        let priority = formData.get('priority')?.toLowerCase().trim();
        const title = formData.get('title');
        const body = formData.get('body');
        const board_id = params.board_id;

        if (!allowedStatuses.includes(status)) {
            return fail(400, { message: 'Invalid status' });
        }

        await db.run(
            'INSERT INTO tickets (board_id, status, priority, title, body) VALUES (?, ?, ?, ?, ?)',
            [board_id, status, priority, title, body]
        );

        throw redirect(303, '/kanban_page/' + board_id);

    }
};


// export const load = async ({ locals }) => {

// };
