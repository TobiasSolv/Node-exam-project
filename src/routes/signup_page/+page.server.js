import db from '../../../database/connection.js';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import { welcomeEmail } from '../../lib/welcome_email.js'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { generateToken, logToken } from "$lib/auth/jwt";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')?.toString();

        console.log("SERVER RECEIVED:", email, password);

        if (email === null || email === "") {
            return fail(409, { message: 'Email already registered' });
        }

        if (password === null || password === "") {
            return fail(409, { message: 'Email already registered' });
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

        // Create token for the new user
        const tokenPayload = {
            external_id,
            email: email.toString(),
        };

        const accessToken = generateToken(tokenPayload);

        // Set JWT cookie
        // Todo auth users 
        //cookies.set("access_token", accessToken);

        // Log token to database
        if (external_id) {
            // We use a non-awaited promise to avoid blocking
            logToken(accessToken, external_id).catch((err) => {
                console.error("Failed to log token:", err);
            });
        } else {
            console.error(
                "Cannot log token: external_id is null or undefined"
            );
        }

        try {
            await db.run('INSERT INTO users (external_id, email, password) VALUES (?, ?, ?)', [external_id, email, hashedPassword]);
            console.log("DATABASE REQ DONE - User created");

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
