import { Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../services/Models";
import { RegisterRequest } from "../../@types/auth";
//
class RegisterController {
    async register(req: RegisterRequest, res: Response) {
        try {
            const data = req.body;
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
