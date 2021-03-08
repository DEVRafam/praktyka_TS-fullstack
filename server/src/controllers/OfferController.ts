import { Response } from "express";
import path from "path";
import { promisify } from "util";
import fse from "fs-extra";
//
import { GetAllRequest, GetSingleRequest, CreateRequest, OfferSchema } from "../@types/Offers";
import { Offer, User, Review } from "../services/Models";
import generateSlug from "../helpers/generateSlugName";
import { UploadedFile } from "express-fileupload";
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
            if (req.query.skipStatus === "__SKIP") delete where.status;
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
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            price: req.body.price,
            contact: JSON.parse(req.body.contact),
            photos,
            localization: req.body.localization,
            creator_id: req.authorizedToken.id,
        };
        //
        await Offer.create(data);
        //
        return res.sendStatus(201);
    }
}
export default new OfferController();
