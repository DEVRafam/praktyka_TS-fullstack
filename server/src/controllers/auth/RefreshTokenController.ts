// types
import { Response } from "express";
import { RefreshTokenBody } from "../../middlewares/AuthValidators";
// tools
import jwt from "jsonwebtoken";
import { VerifyErrors } from "jsonwebtoken";
import generateJWT from "../../helpers/generateJWT";
import { JWTUser } from "../../helpers/generateJWT";
import { User } from "../../services/Models";
import path from "path";
const { refresh_secret } = require(path.join(__dirname, "..", "..", "config", "config")).tokens;
//
//
//
type DecodedTokens = {
    accessToken: JWTUser;
    refreshToken: JWTUser;
};
//
export type RefreshResponse = {
    status: "positive" | "negative";
    error?: string;
    accessToken: string;
};
//
class RefreshTokenController {
    protected decoded = {} as DecodedTokens;
    protected user = {} as any;
    // helper
    protected tokensAreNotEqual(): boolean {
        let equal = true;
        const { decoded } = this;
        //
        ["id", "password", "createdAt"].forEach((prop) => {
            if (decoded.accessToken[prop] !== decoded.refreshToken[prop]) equal = false;
        });
        return !equal;
    }
    //
    // helper
    //
    // return true when either user with ID from token doesn't exist in the db
    // or when user does exist, but doesn't have refresh token in tokens field
    // otherwise return false- that means everything is alright with tokens so far
    protected async tokensDontMatchUserInDB(refreshToken: string): Promise<boolean> {
        const { id, createdAt } = this.decoded.accessToken;
        const user = await User.findOne({ where: { id } });
        // user does not exist
        if (!user) return true;
        this.user = user;
        // refresh token and user in database has different create date
        if (Number(new Date(createdAt)) !== Number(new Date(user.createdAt))) return true;
        // user from DB doens't cointains refresh token in his token field
        if (JSON.parse(user.tokens).indexOf(refreshToken) >= 0) return false;
        //
        return false;
    }
    // helper
    protected refreshTokenHasExpired(refreshToken: string): boolean {
        let result = false;
        jwt.verify(refreshToken, refresh_secret, (err: VerifyErrors) => {
            result = !!err;
        });
        return result;
    }
    // helper
    protected async removeRefreshTokenFromDB(refreshToken: string) {
        const tokens = JSON.parse(this.user.tokens);
        const index = tokens.indexOf(refreshToken);
        //
        if (index === -1) return false;
        else {
            tokens.splice(index, 1);
            await this.user.update({ tokens: JSON.stringify(tokens) });
        }
    }
    //
    // main function
    //
    async refresh(req: RefreshTokenBody, res: Response) {
        // compare tokens
        this.decoded = {
            refreshToken: jwt.decode(req.body.refreshToken),
            accessToken: jwt.decode(req.body.accessToken),
        } as DecodedTokens;
        //
        if (this.tokensAreNotEqual() || (await this.tokensDontMatchUserInDB(req.body.refreshToken))) {
            return res.sendStatus(400);
        }
        //
        if (this.refreshTokenHasExpired(req.body.refreshToken)) {
            await this.removeRefreshTokenFromDB(req.body.refreshToken);
            return res.send({
                status: "negative",
                error: "refresh token has expired",
            } as RefreshResponse);
        }
        //
        else {
            return res.send({
                status: "positive",
                accessToken: generateJWT(this.user, "ACCESS"),
            } as RefreshResponse);
        }
    }
}
export default new RefreshTokenController();
