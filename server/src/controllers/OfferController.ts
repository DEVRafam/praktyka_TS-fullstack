import { Response } from "express";
import path from "path";
import { promisify } from "util";
import fse from "fs-extra";
import jwt from "jsonwebtoken";
import { UploadedFile } from "express-fileupload";
//
import { GetAllRequest, GetSingleRequest, CreateRequest, OfferSchema, DeleteRequest } from "../@types/Offers";
import { Offer, User, Review } from "../services/Models";
import generateSlug from "../helpers/generateSlugName";
const { access_secret } = require(path.join(__dirname, "..", "config", "config")).tokens;
//
//
//
class OfferController {
    protected excludeFromCreator: readonly string[] = ["id", "createdAt", "updatedAt", "tokens", "password"];
    protected excludeFromOffer: readonly string[] = ["createdAt", "creator_id"];
    protected excludeFromReviews: readonly string[] = ["createdAt", "id", "creator_id", "reviewer_id", "dealer_id"];
    protected uploadPath: string = path.join(__dirname, "..", "..", "upload", "offers");
    //
    protected beforeSend(data: OfferSchema[] | OfferSchema) {
        // basically reverse reviews table to impose DESC sorting via alternative way
        if (data instanceof Array) {
            data.forEach((row) => {
                row.creator.reviews_about_self.reverse();
            });
        } else data.creator.reviews_about_self.reverse();
        //
        return data;
    }
    //
    //
    //
    async getAll(req: GetAllRequest, res: Response) {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            //
            const response = await Offer.findAll({
                where: {
                    status: "DEFAULT",
                },
                attributes: {
                    exclude: [...this.excludeFromOffer, "status"],
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludeFromCreator,
                        },
                        include: [
                            {
                                model: Review,
                                as: "reviews_about_self",
                                attributes: {
                                    exclude: this.excludeFromReviews,
                                },
                            },
                        ],
                    },
                ],
                order: [["id", "DESC"]],
                // pagination
                limit,
                offset: (page - 1) * limit,
            });
            //
            return res.send(this.beforeSend(response) as OfferSchema[]);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    //
    //
    async getSingle(req: GetSingleRequest, res: Response) {
        try {
            const { slug } = req.params;
            if (slug === undefined) return res.sendStatus(400);
            //
            const where = {
                slug,
                status: "DEFAULT",
            };
            // AUTHORIZE USER
            // the main reason of doing it, is to give admins and offers owners
            // ability to get access offer independently from status
            try {
                const token = req.headers.authorization.split(" ")[1];
                let userId = null;
                //
                jwt.verify(token, access_secret, (err: any, dataFromToken: any) => {
                    const keys = Object.keys(dataFromToken);
                    const propertiesToCheck = ["id", "password", "createdAt", "iat", "exp"];
                    let tokenIsRight = true;
                    propertiesToCheck.forEach((property) => {
                        if (!keys.includes(property)) tokenIsRight = false;
                    });
                    //
                    if (tokenIsRight) userId = dataFromToken.id;
                });
                //
                const user = await User.findOne({
                    where: { id: userId },
                    include: [{ model: Offer, as: "offers", attributes: ["slug"] }],
                });
                if (user.role === "ADMIN" || user.offers.find((target: { slug: string }) => target.slug === req.params.slug)) {
                    delete where.status;
                }
            } catch (e: any) {}
            //
            const response = await Offer.findOne({
                where,
                attributes: {
                    exclude: this.excludeFromOffer,
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludeFromCreator,
                        },
                        include: [
                            {
                                model: Review,
                                as: "reviews_about_self",
                                attributes: {
                                    exclude: this.excludeFromReviews,
                                },
                                order: [["id", "DESC"]],
                            },
                        ],
                    },
                ],
            });
            //
            return response ? res.send(this.beforeSend(response) as OfferSchema) : res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    //
    //
    async create(req: CreateRequest, res: Response) {
        try {
            const slug = generateSlug(req.body.title);
            // create foldet to further storing images
            const folder: string = `${slug.slice(0, 10)}_${Date.now()}`;
            fse.ensureDirSync(path.join(this.uploadPath, folder));
            // upload all photo
            const photos: string[] = [];
            for (let imgKey in req.files) {
                const file = req.files[imgKey] as UploadedFile;
                const ext = file.name.split(".")[1];
                const fileName = `photo_${Date.now()}.${ext}`;
                const uploadImg = promisify(file.mv);
                //
                if (["jpg", "jpeg", "png"].includes(ext)) {
                    await uploadImg(path.join(this.uploadPath, folder, fileName));
                    photos.push(fileName);
                }
            }
            // create new offer
            const data = {
                title: req.body.title,
                slug,
                folder,
                category: req.body.category,
                description: req.body.description,
                advantages: JSON.parse(req.body.advantages),
                currency: req.body.currency,
                price: req.body.price,
                contact: JSON.parse(req.body.contact),
                photos,
                localization: req.body.localization,
                country: req.body.country,
                creator_id: req.authorizedToken.id,
            };
            //
            await Offer.create(data);
            //
            return res.sendStatus(201);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    //
    //
    async delete(req: DeleteRequest, res: Response) {
        const offer = await Offer.findOne({ where: { id: req.params.id } });
        if (!offer) return res.sendStatus(404);
        //
        const handleDelete = async () => {
            await fse.remove(path.join(this.uploadPath, offer.folder));
            await offer.destroy();
        };
        //
        // check if authorized user owns this offer
        if (req.authorizedToken.id === offer.creator_id) {
            await handleDelete();
            return res.sendStatus(200);
        }
        // check if authorized user is admin
        else {
            const user = await User.findOne({ where: { id: req.authorizedToken.id } });
            if (user.role === "ADMIN") {
                await handleDelete();
                return res.sendStatus(200);
            }
        }
        //
        return res.sendStatus(401);
    }
}
export default new OfferController();
