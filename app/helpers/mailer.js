import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD_EMAIL,
    },
});

async function sendEmailConfirmation (email, user, unique) {
    await transporter.sendMail({
        from: '"Email de Confirmación" <set.padel@gmail.com>',
        to: email, 
        subject: "Email de Confirmación",
        html: `<style>
                    body {
                        width: 100%;
                        height: 100%;
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        height: 100%;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #18D266;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                        font-size: 2rem;
                    }
                    p {
                        color: #010101;
                        line-height: 1.6;
                        font-size:1.5rem;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 1rem;
                        color: #888;
                    }
                </style>
                <body>
                    <div class="container">
                        <h2>Confirmación de Inicio de Sesión</h2>
                        <p>Hola ${user},</p>
                        <p>Has iniciado sesión en nuestro sistema. Para confirmar tu inicio de sesión, haz clic en el siguiente enlace:</p>
                        <p><a href="http://localhost:3050/api/confirm_email?unique=${unique}&user=${user}">Verificar inicio de sesión</a></p>
                        <p>Si no has intentado iniciar sesión o consideras que esto es un error, por favor ignora este mensaje.</p>
                        <p class="footer">Set Padel House &copy; 2024</p>
                    </div>
                </body>`
    });
}




export const methods = {
    sendEmailConfirmation,
}