import { Response } from "express";
//
import { GetHighlightedArticlesRequest, ArticleSchema } from "../../@types/articles";
import { Article, User, HighligtedArticle } from "../../services/Models";
import { HIGHLIGHTED_ARTICLES_AMOUNT } from "../../config/config";
//
class GetHighlightedArticlesController {
    protected req: GetHighlightedArticlesRequest;
    protected excludes = {
        fromArticle: ["createdAt", "creator_id", "mentioned_offers"],
        fromCreator: ["createdAt", "updatedAt", "tokens", "password", "contact", "email"],
    };
    //
    //
    //
    async main(req: GetHighlightedArticlesRequest, res: Response) {
        try {
            this.req = req;
            let response = await HighligtedArticle.findAll({
                include: [
                    {
                        model: Article,
                        as: "article",
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
                    },
                ],
                order: [["id", "DESC"]],
                attributes: [],
                limit: req.query.limit || HIGHLIGHTED_ARTICLES_AMOUNT,
            });
            //
            interface HighlightedArticle {
                article: ArticleSchema;
            }
            response = response.map((el: HighlightedArticle, index: number) => (response[index] = el.article));
            //
            return res.send(response);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetHighlightedArticlesController();
