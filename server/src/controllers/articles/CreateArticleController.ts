import path from "path";
import fse from "fs-extra";
import { Response } from "express";
import { promisify } from "util";
import { UploadedFile } from "express-fileupload";
//
import { Article } from "../../services/Models";
import generateSlug from "../../helpers/generateSlugName";
import { CreateArticleRequest } from "../../@types/articles";
//
//
//
class CreateArticleController {
    protected req: CreateArticleRequest;
    protected uploadPath: string = path.join(__dirname, "..", "..", "..", "upload", "articles");
    //
    // helpers
    //
    protected createFolderForUpload(slug: string): string {
        const folder: string = `${slug.slice(0, 10)}_${Date.now()}`;
        fse.ensureDirSync(path.join(this.uploadPath, folder));
        return folder;
    }
    protected async uploadAllImages(folder: string) {
        for (let imgKey in this.req.files) {
            const file = this.req.files[imgKey] as UploadedFile;
            const ext = file.name.split(".")[1];
            const uploadImg = promisify(file.mv);
            //
            if (["jpg", "jpeg", "png"].includes(ext)) {
                await uploadImg(path.join(this.uploadPath, folder, imgKey));
            }
        }
    }
    protected prepareData(slug: string, folder: string) {
        const { req } = this;
        return {
            title: req.body.title,
            slug,
            folder,
            mentioned_offers: JSON.parse(req.body.mentioned_offers),
            content: JSON.parse(req.body.content),
            tags: JSON.parse(req.body.tags),
            creator_id: req.authorizedToken.id,
        };
    }
    //
    //
    //
    async main(req: CreateArticleRequest, res: Response) {
        try {
            this.req = req;
            const slug = generateSlug(req.body.title);
            const folder = this.createFolderForUpload(slug);
            await this.uploadAllImages(folder);
            //
            await Article.create(this.prepareData(slug, folder));
            //
            return res.status(201).send({ slug });
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new CreateArticleController();
