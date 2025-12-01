import nodemailer from 'nodemailer';

let testAccount = await nodemailer.createTestAccount();

export const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
});