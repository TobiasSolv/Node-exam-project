import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import { welcomeEmail } from '../../lib/welcome_email.js'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')?.toString();

        if (email === null || email === "") {
            return fail(409, { message: 'Email already registered' });
        }

        if (password === null || password === "") {
            return fail(409, { message: 'Password is invalid' });
        }

        // Check if user already exists
        const checkUser = await db.all('SELECT * FROM users WHERE email = ?', [email]);
        if (checkUser.length > 0) {
            return fail(409, { message: 'Email already registered' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const external_id = uuidv4();

        try {
            await db.run('INSERT INTO users (external_id, email, password) VALUES (?, ?, ?)', [external_id, email, hashedPassword]);

            welcomeEmail(email).catch(err => {
                console.log("Failed to send email: ", err)
            });


            return { success: true };

        } catch (err) {
            console.error("Database error:", err);
            return fail(500, { message: 'Failed to create account. Please try again.' });
        }

    }
};
