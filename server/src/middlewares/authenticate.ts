import jwt from "jsonwebtoken";
import { User } from "../services/Models";
import { Request, Response, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";
import { AuthorizedRequest } from "../@types/authenticate";
import { tokens } from "../config/config";
const { access_secret } = tokens;
//
//
//
export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization === undefined) return res.sendStatus(401);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, access_secret, async (err: VerifyErrors, userFromToken: any) => {
        if (err) return res.sendStatus(401);
        //
        const keys = Object.keys(userFromToken);
        let tokenIsRight = true;
        // validate token structure
        ["id", "password", "createdAt", "iat", "exp"].forEach((property) => {
            if (!keys.includes(property)) tokenIsRight = false;
        });
        // validate authenticity of data from token
        const userFromDB = await User.findOne({ where: { id: userFromToken.id } });
        if (tokenIsRight) {
            const passwordDoNotMatch = userFromDB.password != userFromToken.password;
            const CreatedAtDoNotMatch = Number(new Date(userFromDB.createdAt)) != Number(new Date(userFromToken.createdAt));
            //
            if (passwordDoNotMatch || CreatedAtDoNotMatch) tokenIsRight = false;
        }
        //
        if (tokenIsRight) {
            (req as AuthorizedRequest).authorizedToken = {
                id: userFromToken.id,
                role: userFromDB.role,
            };
            next();
        } else res.sendStatus(401);
    });
};
