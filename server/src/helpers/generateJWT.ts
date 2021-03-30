import jwt from "jsonwebtoken";
import { tokens } from "../config/config";
const { access_secret, refresh_secret, access_expiration, refresh_expiration } = tokens;
//
type TokenType = "ACCESS" | "REFRESH";
//
//
export interface JWTUser {
    [key: string]: "password" | "id" | "createdAt";
}
//
export default (user: any, tokenType: TokenType): string => {
    const propertiesToToken = ["password", "id", "createdAt"];
    const dataToToken = {} as JWTUser;
    //
    propertiesToToken.forEach((prop) => {
        dataToToken[prop] = user[prop];
    });
    //
    if (tokenType === "ACCESS") {
        return jwt.sign(dataToToken, access_secret, { expiresIn: access_expiration });
    } else if (tokenType === "REFRESH") {
        return jwt.sign(dataToToken, refresh_secret, { expiresIn: refresh_expiration });
    }
};
