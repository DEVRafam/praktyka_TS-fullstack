import { Response } from "express";
//
import { HighlightArticleRequest } from "../../@types/articles";
import { HighligtedArticle } from "../../services/Models";
//
//
//
class HighlightArticleController {
    async main(req: HighlightArticleRequest, res: Response) {
        try {
            const currentHighlight = await HighligtedArticle.findOne({ where: { article_id: req.params.id } });
            //
            if (currentHighlight) await currentHighlight.destroy();
            else await HighligtedArticle.create({ article_id: req.params.id });
            //
            return res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new HighlightArticleController();
