import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

function user(req, res) {
        const token = req.body.token;
        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ ok: true, token: decoded.name});
        }
        catch{
            return res.status(401).json({ ok: false, message: "Token no válido" });
        }

}

function user_description(req, res){
    const token = req.body.token;
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ ok: true, name: decoded.name, mail: decoded.mail, descripcion: decoded.descripcion, posicion: decoded.posicion, nivel: decoded.nivel});
    }
    catch{
        return res.status(401).json({ ok: false, message: "Token no válido" });
    }
}

export const methods = {
    user,
    user_description
}