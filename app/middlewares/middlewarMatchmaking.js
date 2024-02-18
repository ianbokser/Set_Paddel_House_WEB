import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export function isUser(req, res, next) {

    const token = req.body.token;
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if (!token) return res.status(401).send({ status: "error", message: "usuario no loguado" });
        if (!decoded) return res.status(401).send({ status: "error", message: "usuario no loguado" });
        else next();
    } catch (error) {
        return res.status(401).send({ status: "error", message: "usuario no loguado" });
    }
}

export const methods = {
    isUser,
}