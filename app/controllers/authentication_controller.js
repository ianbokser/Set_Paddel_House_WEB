import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import { usuarioExiste, agregarNuevoCliente, verificarUsuarioYContraseña } from '../helpers/functionsDB.js';

dotenv.config();

const DB_host = process.env.DB_host;
const DB_user = process.env.DB_user;
const DB_password = process.env.DB_password;
const DB_database = process.env.DB_database;

async  function login(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
    }

    const usuarioAResvisar = await verificarUsuarioYContraseña(DB_host, DB_user, DB_password, DB_database, email, password);
    if(!usuarioAResvisar){
        return res.status(400).send({status:"Error",message:"Error durante login"})
    }
    else {
        const tokenSession = jsonwebtoken.sign({
            name: usuarioAResvisar.usuario_cliente,
            id_cliente: usuarioAResvisar.id_cliente,
        }, process.env.JWT_SECRET);
        res.send({ token: tokenSession, redirect: "../index.html" });
    }
}

async function register(req, res) {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if (!user || !email || !password) {
        return res.status(400).send({ status: "error", Message: "los campos están incompletos" });
    }
    try {
        const usuarioARevisar = await usuarioExiste(DB_host, DB_user, DB_password, DB_database, user, email);
        if (usuarioARevisar) {
            return res.status(400).send({ status: "error", Message: "este usuario ya existe" });
        } else {
            const hashPassword = await bcryptjs.hash(password, 5);
            try {
                agregarNuevoCliente(DB_host, DB_user, DB_password, DB_database, user, email, hashPassword);
                return res.status(201).send({Status:"ok",Message: "usuario agregado",redirect:"./login.html"});
            } catch (error) {
                console.error('Error al agregar usuario:', error);
                return res.status(400).send({ status: "error",message: "error al agregar al usuario"});
            }
        }
    } catch (error) {
        console.error('Error al verificar usuario:', error);
        return res.status(500).send({ status: "error", Message: "Error al verificar usuario" });
    }
}


export const methods = {
    login,
    register
}