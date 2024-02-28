import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

import { cargarAlquiler, busyHours } from '../helpers/functionsDB.js';
dotenv.config();

const DB_host = process.env.DB_host;
const DB_user = process.env.DB_user;
const DB_password = process.env.DB_password;
const DB_database = process.env.DB_database;

async function cargarAlquileres(req, res) {
    const token = req.body.token;
    const date = req.body.date;
    const hour = req.body.hour;
    const tokenData = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (tokenData) {
        const id_cliente = tokenData.id_cliente;
        const alquileres = await cargarAlquiler(DB_host, DB_user, DB_password, DB_database, id_cliente, date, hour);
        const tokenAlquiler = jsonwebtoken.sign({
            id_cliente: id_cliente,
            id_alquiler: alquileres.insertId,
        }, process.env.JWT_SECRET);
        return res.status(201).send({Status:"ok", tokenAlquiler: tokenAlquiler});
        } else {
        res.status(400).send({ status: "error", message: "Error al verificar el token" });
    }
}
async function busy_hours (req, res) {
    const date = req.body.date;
    const busy_hours = await busyHours(DB_host, DB_user, DB_password, DB_database, date);
    if (busy_hours) {
        res.status(200).send({Status:"ok", busy_hours: busy_hours});
    } else {
        res.status(400).send({ status: "error", message: "Error al verificar las horas ocupadas" });
    }
}


export const methods = {
    cargarAlquileres,
    busy_hours,
}