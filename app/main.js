import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { methods as authentication } from './controllers/authentication_controller.js';
import { methods as giveuser } from './helpers/user.js';
const app = express();
const port = 3050;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.listen(port, () => {
    console.log(`Executing at http://localhost:${port}`);
});

app.post("/api/user", giveuser.user);
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);