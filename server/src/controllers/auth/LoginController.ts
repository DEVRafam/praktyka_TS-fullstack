import { Request, Response } from "express";
import { User } from "../../services/Models";
import bcrypt from "bcrypt";
import generateJWT from "../../helpers/generateJWT";
//
type LoginRequestBody = {
    password: string;
    email: string;
};
export type LoginResponse = {
    status: "positive" | "negative";
    errors?: "credentials_do_not_match";
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    userData?: {
        id: any;
        name: string;
        surname: string;
        email: string;
    };
};
//
class LoginController {
    async login(req: Request, res: Response): Promise<Response<LoginResponse>> {
        try {
            const { password, email } = req.body as LoginRequestBody;
            const user = await User.findOne({ where: { email } });
            //
            // compare credentials
            //
            const passwordIsInvalid: boolean = user && !(await bcrypt.compare(password, user.password));
            if (user === null || passwordIsInvalid)
                return res.send({
                    status: "negative",
                    errors: "credentials_do_not_match",
                } as LoginResponse);
            //
            // generate new tokens
            //
            const accessToken = generateJWT(user, "ACCESS");
            const refreshToken = generateJWT(user, "REFRESH");
            //
            const tokens = JSON.parse(user.tokens);
            tokens.push(refreshToken);
            user.tokens = JSON.stringify(tokens);
            await user.save();
            //
            return res.send({
                status: "positive",
                tokens: {
                    accessToken,
                    refreshToken,
                },
                userData: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                },
            } as LoginResponse);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new LoginController();
