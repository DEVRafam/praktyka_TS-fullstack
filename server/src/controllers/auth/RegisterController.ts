import { Response, Request } from "express";
import { User } from "../../services/Models";
import bcrypt from "bcrypt";
//
type RegisterRequestBody = {
    name: string;
    surname: string;
    email: string;
    password: string;
    repeat_password: string;
};
//
class RegisterController {
    async register(req: Request, res: Response) {
        try {
            const data = req.body as RegisterRequestBody;
            data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
            await User.create(data);
            //
            return res.sendStatus(201);
        } catch (_: any) {
            return res.sendStatus(500);
        }
    }
}
export default new RegisterController();
