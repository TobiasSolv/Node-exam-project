import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');

        // Check if email exists
        const rows = await db.all('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return fail(400, { message: "Invalid email" });
        }

        const user = rows[0];

        // Hash new password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update DB
        await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);

        throw redirect(302, '/login_form');
    }
};
