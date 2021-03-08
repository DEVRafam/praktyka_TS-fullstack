import { Response } from "express";
import { promisify } from "util";
import { AuthorizedRequest } from "../middlewares/authenticate";
import { User } from "../services/Models";
import path from "path";
import fse from "fs-extra";
//
class UserController {
    //
    async changeAvatar(req: AuthorizedRequest, res: Response) {
        try {
            const { avatar }: { avatar: any } = req.files as any;
            const { id } = req.authorizedToken;
            if (!avatar) return res.sendStatus(400);
            //
            const ext = avatar.name.split(".")[1];
            const fileName = `avatar_${Date.now()}.${ext}`;
            const uploadImg = promisify(avatar.mv);
            //
            const user = await User.findOne({ where: { id } });
            if (!user) return res.sendStatus(404);
            if (user.avatar) {
                await fse.remove(path.join(__dirname, "..", "..", "upload", "avatars", user.avatar));
            }
            await uploadImg(path.join(__dirname, "..", "..", "upload", "avatars", fileName));
            //
            await user.update({ avatar: fileName });
            //
            res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
//
export default new UserController();
