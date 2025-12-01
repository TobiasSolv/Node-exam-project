import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        console.log("\nSERVER RECEIVED:", email, password);

        const rows = await db.all('SELECT * FROM users WHERE email = ?', [email]);

        console.log("DB rows:", rows);

        if (rows.length === 0) {
            return fail(401, { message: 'Invalid email or password' });
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return fail(401, { message: 'Invalid email or password' });
        }

        console.log("LOGIN SUCCESS");

        cookies.set('session_id', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60
        });

        return { success: true };
    }
};



