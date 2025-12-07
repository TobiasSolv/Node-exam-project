import nodemailer from 'nodemailer';

let testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
});

export async function welcomeEmail(toEmail) {
    try {
        const info = await transporter.sendMail({
            from: '"Welcome Bot" <no-reply@example.com>',
            to: toEmail,
            subject: "Welcome!",
            text: "Thank you for signing up.",
            html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
        });

        console.log("Message sent:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
}

export { transporter };
