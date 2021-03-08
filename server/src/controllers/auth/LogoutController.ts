import { Response } from "express";
import { AuthorizedRequest } from "../../@types/authenticate";
import { User } from "../../services/Models";
//
//
class LogoutController {
    async logout(req: AuthorizedRequest, res: Response) {
        try {
            const userFromDB = await User.findOne({ where: { id: req.authorizedToken.id } });
            const { refreshToken } = req.body;
            //
            const usersTokens = JSON.parse(userFromDB.tokens);
            const index = usersTokens.indexOf(refreshToken);
            if (index === -1) return res.sendStatus(400);
            usersTokens.splice(index, 1);
            await userFromDB.update({ tokens: JSON.stringify(usersTokens) });
            //
            return res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new LogoutController();
