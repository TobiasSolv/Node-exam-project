import db from '../../../database/connection.js';
import { fail } from '@sveltejs/kit';
import { transporter } from '$lib/welcome_email.js';
import nodemailer from 'nodemailer';

export const actions = {
    default: async ({ request, url }) => {
        const form = await request.formData();
        const email = form.get("email");

        console.log("RESET REQUEST:", email);

        const rows = await db.all("SELECT id FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return fail(400, { message: "Email not found" });
        }

        const resetLink = `${url.origin}/reset_password_page?email=${encodeURIComponent(email)}`;

        const info = await transporter.sendMail({
            from: '"Support" <noreply@example.com>',
            to: email,
            subject: "Password Reset",
            html: `<p>Click link to reset:</p><a href="${resetLink}">${resetLink}</a>`
        });

        console.log("Mail preview:", nodemailer.getTestMessageUrl(info));

        return { success: true };
    }
};
