import path from "path";
import fse from "fs-extra";
import { Response } from "express";
import { promisify } from "util";
import { UploadedFile } from "express-fileupload";
//
import { CreateRequest } from "../../@types/Offers";
import { Offer } from "../../services/Models";
import generateSlug from "../../helpers/generateSlugName";
//
class CreateNewOfferController {
    protected req: CreateRequest;
    protected uploadPath: string = path.join(__dirname, "..", "..", "..", "upload", "offers");
    //
    // helpers
    //
    protected createFolderForUpload(slug: string): string {
        const folder: string = `${slug.slice(0, 10)}_${Date.now()}`;
        fse.ensureDirSync(path.join(this.uploadPath, folder));
        return folder;
    }
    protected async uploadAllImages(folder: string): Promise<string[]> {
        const photos: string[] = [];
        //
        for (let imgKey in this.req.files) {
            const file = this.req.files[imgKey] as UploadedFile;
            const ext = file.name.split(".")[1];
            const fileName = `photo_${Date.now()}.${ext}`;
            const uploadImg = promisify(file.mv);
            //
            if (["jpg", "jpeg", "png"].includes(ext)) {
                await uploadImg(path.join(this.uploadPath, folder, fileName));
                photos.push(fileName);
            }
        }
        //
        return photos;
    }
    protected generateValueInUSD(): number {
        const { currency, price } = this.req.body;
        const values: { [key: string]: number } = {
            USD: 1,
            EUR: 0.84,
            PLN: 3.84,
            GBP: 0.72,
        };
        return ((price / values[currency]) as any).toFixed(2) * 1;
    }
    protected prepareData(slug: string, folder: string, photos: string[]) {
        const { req } = this;
        return {
            title: req.body.title,
            slug,
            folder,
            category: req.body.category,
            description: req.body.description,
            advantages: JSON.parse(req.body.advantages),
            price: req.body.price,
            currency: req.body.currency,
            valueInUSD: this.generateValueInUSD(),
            contact: JSON.parse(req.body.contact),
            photos,
            localization: req.body.localization,
            country: req.body.country,
            creator_id: req.authorizedToken.id,
        };
    }
    //
    //
    //
    async main(req: CreateRequest, res: Response) {
        this.req = req;
        try {
            const slug = generateSlug(req.body.title);
            const folder = this.createFolderForUpload(slug);
            const photos = await this.uploadAllImages(folder);
            //
            await Offer.create(this.prepareData(slug, folder, photos));
            //
            return res.status(201).send({ slug });
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new CreateNewOfferController();
