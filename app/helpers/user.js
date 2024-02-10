import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

function user(req, res) {
        const token = req.body.token;
        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ ok: true, user: decoded.name, descuento: decoded.descuento});
        }
        catch{
            return res.status(401).json({ ok: false, message: "Token no válido" });
        }

}

export const methods = {
    user,
}