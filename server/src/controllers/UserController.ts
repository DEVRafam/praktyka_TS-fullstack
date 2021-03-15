import path from "path";
import { Response, Request } from "express";
import { promisify } from "util";
import fse from "fs-extra";
import { AuthorizedRequest } from "../@types/authenticate";
import { Offer, User, Review } from "../services/Models";
//
class UserController {
    protected profileExcludes = {
        fromUser: ["password", "updatedAt", "tokens"],
        fromOffer: ["updatedAt", "status", "contact", "valueInUSD", "advantages", "description", "creator_id", "id"],
        fromReview: ["id", "dealer_id", "updatedAt"],
        fromReviewer: ["password", "updatedAt", "tokens", "email", "role"],
    };
    //
    async profileData(req: Request<{ id: number }>, res: Response) {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: { exclude: this.profileExcludes.fromUser },

            include: [
                {
                    model: Offer,
                    as: "offers",
                    attributes: { exclude: this.profileExcludes.fromOffer },
                },
                {
                    model: Review,
                    as: "reviews_about_self",
                    attributes: { exclude: this.profileExcludes.fromReview },
                    include: [
                        {
                            model: User,
                            as: "reviewer",
                            attributes: { exclude: this.profileExcludes.fromReviewer },
                        },
                    ],
                },
            ],
        });
        //
        return res.send(user);
    }
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
