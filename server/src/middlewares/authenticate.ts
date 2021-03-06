// types
import { Request, Response, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";
// tools
import jwt from "jsonwebtoken";
import path from "path";
const { access_secret } = require(path.join(__dirname, "..", "config", "config")).tokens;
//
//
//
export interface AuthorizedRequest extends Request {
    authorizedToken: {
        id: any;
    };
}
//
export default (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization === undefined) return res.sendStatus(401);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, access_secret, (err: VerifyErrors, dataFromToken: any) => {
        if (err) return res.sendStatus(401);
        //
        const keys = Object.keys(dataFromToken);
        const propertiesToCheck = ["id", "password", "createdAt", "iat", "exp"];
        let tokenIsRight = true;
        propertiesToCheck.forEach((property) => {
            if (!keys.includes(property)) tokenIsRight = false;
        });
        //
        if (tokenIsRight) {
            (req as AuthorizedRequest).authorizedToken = {
                id: dataFromToken.id,
            };
            next();
        } else res.sendStatus(401);
    });
};
