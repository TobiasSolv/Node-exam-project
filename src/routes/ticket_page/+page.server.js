import { redirect, fail } from '@sveltejs/kit';
import db from '../../../database/connection.js';

export const actions = {
    add: async ({ request }) => {
        try {
            const formData = await request.formData();
            const status = formData.get('status');
            const priority = formData.get('priority');
            const title = formData.get('title');
            const body = formData.get('body');

            if (!status) {
                return fail(401, { message: 'You have to have a status' });
            }

            await db.run('INSERT INTO tickets (status, priority, title, body) VALUES (?, ?, ?, ?)', [status, priority, title, body]);


            return { success: true };
        } catch (err) {
            console.error("Database error:", err);
            return fail(500, { message: 'Failed to create ticket. Please try again.' });
        }
    }
};


// export const load = async ({ locals }) => {

// };
