import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { generateToken, logToken } from "$lib/auth/jwt";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        const rows = await db.all('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return fail(401, { message: 'Invalid email or password' });
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return fail(401, { message: 'Invalid email or password' });
        }

        const session_id = uuidv4();

        await db.run('INSERT INTO sessions (user_id, key, expires_at) VALUES (?, ?, ?)', [user.id, session_id, ""])

        const tokenPayload = {
            external_id: user.external_id,
            email: user.email,
        };

        const accessToken = generateToken(tokenPayload);

        cookies.set('access_token', accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 24
        });

        // We use a non-awaited promise to avoid blocking
        logToken(accessToken, user.external_id).catch((err) => {
            console.error("Failed to log token:", err);
        });


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