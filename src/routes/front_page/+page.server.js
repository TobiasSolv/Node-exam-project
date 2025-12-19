import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        console.log("\nSERVER RECEIVED:", email, password);

        const rows = await db.all('SELECT * FROM users WHERE email = ?', [email]);

        console.log("DB rows login form:", rows);

        if (rows.length === 0) {
            return fail(401, { message: 'Invalid email or password' });
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return fail(401, { message: 'Invalid email or password' });
        }

        console.log("LOGIN SUCCESS");
        console.log("Stored password:", user.password);
        console.log("Compare:", await bcrypt.compare(password, user.password));

        const session_id = uuidv4();
        console.log(session_id)

        await db.run('INSERT INTO sessions (user_id, key, expires_at) VALUES (?, ?, ?)', [user.id, session_id, ""])


        cookies.set('session_id', session_id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 24
        });

        return {
            success: true
        };
    }
};