import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'
import { response } from 'express';


//read the token grom the request 
//check if is balid
export const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return res.status(401).json({ error: "not authorized no token" })
    }

    try {
        //verify token and extract the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET1)
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if(!user){
            return res.status(401).json({ error: "user do not exist" })

        }
        req.user=user;
        next()
    } catch (err) {
                return res.status(401).json({ error: "not authorized " })

    }
}
