import path from "path";
import { Response, Request } from "express";
import { fn, Op } from "sequelize";
import { promisify } from "util";
import fse from "fs-extra";
import bcrypt from "bcrypt";
import { Offer, User, Review, Follow } from "../services/Models";
import { ChangeAvatarRequest, DeleteUserRequest } from "../@types/user";
//
//
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
        user.reviews_about_others.reverse();
        user.offers.sort((e1: { id: number }, e2: { id: number }) => {
            return e2.id - e1.id;
        });
        //
        return res.send({ ...JSON.parse(JSON.stringify(user)), ...JSON.parse(JSON.stringify(offers_stats)) });
    }
    //
    async changeAvatar(req: ChangeAvatarRequest, res: Response) {
        try {
            const { avatar }: { avatar: any } = req.files as any;
            const id = req.query.user ? req.query.user : req.authorizedToken.id;
            //
            const ext = avatar.name.split(".")[1];
            const fileName = `avatar_${Date.now()}.${ext}`;
            const uploadImg = promisify(avatar.mv);
            //
            const user = await User.findOne({ where: { id } });
            if (user.avatar) {
                await fse.remove(path.join(__dirname, "..", "..", "upload", "avatars", user.avatar));
            }
            await uploadImg(path.join(__dirname, "..", "..", "upload", "avatars", fileName));
            await user.update({ avatar: fileName });
            //
            res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    async deleteUser(req: DeleteUserRequest, res: Response) {
        const user = await User.findOne({ where: { email: req.body.email } });
        const passwordIsInvalid = user && !(await bcrypt.compare(req.body.password, user.password));
        //
        if (!user || passwordIsInvalid) return res.status(400).send("credentials_do_not_match");
        else {
            const { id } = req.params;
            await Review.destroy({
                where: {
                    [Op.or]: [{ reviewer_id: id }, { dealer_id: id }],
                },
            });
            await Follow.destroy({ where: { user_id: id } });
            //
            // delete all offers with their images and followers
            //
            const offers = await Offer.findAll({ where: { creator_id: id } });
            for (let key in offers) {
                const offer = offers[key];
                await fse.remove(path.join(__dirname, "..", "..", "upload", "offers", offer.folder));
                await Follow.destroy({ where: { offer_id: offer.id } });
                await offer.destroy();
            }
            //
            // check if user has settled avatar and delete if he has
            //
            const user = await User.findOne({ where: { id } });
            if (user.avatar) await fse.remove(path.join(__dirname, "..", "..", "upload", "avatars", user.avatar));
            await user.destroy();
            //
            return res.sendStatus(200);
        }
        //
    }
}
//
export default new UserController();
