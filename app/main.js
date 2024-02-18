import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { methods as registration } from './controllers/authentication_controller.js';
import { methods as giveuser } from './helpers/user.js';
import { methods as authentication } from './middlewares/middlewarMatchmaking.js';
import { methods as alquilar } from './rent/alquiler.js';

const app = express();
const port = 3050;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.listen(port, () => {
    console.log(`Executing at http://localhost:${port}`);
});

app.post("/api/user", authentication.isUser, giveuser.user);
app.post("/api/register", registration.register);
app.post("/api/login", registration.login);
app.post("/api/alquilar", authentication.isUser, alquilar.cargarAlquileres);
app.post("/api/profile", authentication.isUser, (req, res) => {
    res.redirect('./pages/perfil.html');
});

// app.post("/api/matchmaking", authentication.isUser, );