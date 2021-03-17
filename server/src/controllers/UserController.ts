import path from "path";
import { Response, Request } from "express";
import { fn } from "sequelize";
import { promisify } from "util";
import fse from "fs-extra";
import { AuthorizedRequest } from "../@types/authenticate";
import { Offer, User, Review, Follow } from "../services/Models";
//
class UserController {
    protected profileExcludes = {
        fromUser: ["password", "updatedAt", "tokens"],
        fromOffer: ["updatedAt", "status", "contact", "valueInUSD", "advantages", "description", "creator_id"],
        fromReview: ["dealer_id", "updatedAt"],
        fromReviewer: ["password", "updatedAt", "tokens", "email", "role"],
        fromFollows: ["createdAt", "updatedAt"],
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
                    where: { status: "DEFAULT" },
                    required: false,
                    include: {
                        model: Follow,
                        required: false,
                        as: "follows",
                        attributes: {
                            exclude: this.profileExcludes.fromFollows,
                        },
                    },
                },
                {
                    model: Review,
                    as: "reviews_about_self",
                    attributes: { exclude: this.profileExcludes.fromReview },
                    required: false,
                    include: [
                        {
                            model: User,
                            as: "reviewer",
                            attributes: { exclude: this.profileExcludes.fromReviewer },
                        },
                    ],
                },
                {
                    model: Review,
                    as: "reviews_about_others",
                    attributes: { exclude: this.profileExcludes.fromReview },
                    required: false,
                    include: [
                        {
                            model: User,
                            as: "dealer",
                            attributes: { exclude: this.profileExcludes.fromReviewer },
                        },
                    ],
                },
            ],
        });
        if (!user) return res.sendStatus(404);
        //
        const offers_stats = {
            offers_stats: await Offer.findAll({
                where: { creator_id: user.id },
                group: ["category"],
                attributes: ["category", [fn("COUNT", "category"), "amount"]],
            }),
        };
        //
        // user.reviews_about_self.reverse();
        user.reviews_about_others.reverse();
        user.offers.sort((e1: { id: number }, e2: { id: number }) => {
            return e2.id - e1.id;
        });
        //
        return res.send({ ...JSON.parse(JSON.stringify(user)), ...JSON.parse(JSON.stringify(offers_stats)) });
    }
    //
    async changeAvatar(req: AuthorizedRequest, res: Response) {
        try {
            const { avatar }: { avatar: any } = req.files as any;
            const id = req.query.user ? req.query.user : req.authorizedToken.id;
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
