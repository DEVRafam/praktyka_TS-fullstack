import { Response } from "express";
import { User } from "../../services/Models";
import bcrypt from "bcrypt";
import generateJWT from "../../helpers/generateJWT";
//
import { LoginRequest, LoginResponse } from "../../@types/auth";
//
class LoginController {
    async login(req: LoginRequest, res: Response): Promise<Response<LoginResponse>> {
        try {
            const { password, email } = req.body;
            const user = await User.findOne({ where: { email } });
            //
            // compare credentials
            //
            const passwordIsInvalid: boolean = user && !(await bcrypt.compare(password, user.password));
            if (user === null || passwordIsInvalid)
                return res.send({
                    result: "negative",
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
                result: "positive",
                tokens: {
                    accessToken,
                    refreshToken,
                },
                userData: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    avatar: user.avatar,
                },
            } as LoginResponse);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new LoginController();
