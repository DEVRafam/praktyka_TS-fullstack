import path from "path";
import fse from "fs-extra";
import { Response } from "express";
//
import { DeleteRequest } from "../../@types/articles";
import { Article, HighligtedArticle } from "../../services/Models";
//
class DeleteArticleController {
    protected req: DeleteRequest;
    protected article: any;
    protected uploadPath: string = path.join(__dirname, "..", "..", "..", "upload", "articles");
    //
    //helpers
    //
    protected userIsAdmin(): boolean {
        return this.req.authorizedToken.role === "ADMIN";
    }
    protected userIsOwner(): boolean {
        return this.req.authorizedToken.id === this.article.creator_id;
    }
    protected async handleDelete() {
        await fse.remove(path.join(this.uploadPath, this.article.folder));
        await HighligtedArticle.destroy({ where: { article_id: this.article.id } });
        await this.article.destroy();
    }
    protected async findOffer() {
        this.article = await Article.findOne({ where: { id: this.req.params.id } });
        return this.article;
    }
    //
    //
    //
    async main(req: DeleteRequest, res: Response) {
        try {
            this.req = req;
            if (!(await this.findOffer())) return res.sendStatus(404);
            //
            if (this.userIsOwner() || this.userIsAdmin()) {
                await this.handleDelete();
                return res.sendStatus(200);
            } else return res.sendStatus(401);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new DeleteArticleController();
