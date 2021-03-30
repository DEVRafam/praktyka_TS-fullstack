import { Response } from "express";
//
import { GetManyArticlesRequest } from "../../@types/articles";
import { Article, User } from "../../services/Models";
import { ARTICLES_PER_PAGE } from "../../config/config";
//
class GetManyArticlesController {
    protected req: GetManyArticlesRequest;
    protected excludes = {
        fromArticle: ["createdAt", "creator_id", "mentioned_offers"],
        fromCreator: ["createdAt", "updatedAt", "tokens", "password", "contact", "email"],
    };
    // helpers
    protected handlePagination() {
        const limit = this.req.query.limit || ARTICLES_PER_PAGE;
        const page = this.req.query.page || 1;
        //
        return {
            limit,
            offset: (page - 1) * limit,
        };
    }
    //
    //
    //
    async main(req: GetManyArticlesRequest, res: Response) {
        try {
            this.req = req;
            const response = await Article.findAndCountAll({
                attributes: { exclude: this.excludes.fromArticle },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludes.fromCreator,
                        },
                    },
                ],
                order: [["id", "DESC"]],
                ...this.handlePagination(),
            });
            //
            return res.send(response);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetManyArticlesController();
