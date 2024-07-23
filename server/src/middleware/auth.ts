import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { APP_SECRET } from "../config";


export const auth = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            return res.status(401).send({
                status: "There is an Error",
                message: "Ensure that you are logged in"
            })
        }
        const pin = authorization.split(" ")[1];
        if (!pin || pin === "") {
            return res.status(401).send({
                status: "Error",
                message: "The pin can't be used"
            })
        }
        const decoded = jwt.verify(pin, `${APP_SECRET}`)
        req.user = decoded
        return next()
    } catch (err) {
        console.log("ERROR:", err)
        return res.status(401).send({
            status: "Error",
            message: err
        })
    }
}


export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, `${APP_SECRET}`) as { role: string }; // replace 'your_jwt_secret' with your actual secret
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};