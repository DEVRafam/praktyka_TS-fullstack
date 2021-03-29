// controllers
import CreateArticleController from "../controllers/articles/CreateArticleController";
import DeleteArticleController from "../controllers/articles/DeleteArticleController";
// tools
import { Response, Router } from "express";
import authorization from "../middlewares/authenticate";
import { CreateNewArticleValidator } from "../middlewares/ArticlesValidators";
//
const router = Router();
//
router.post("/", [authorization, CreateNewArticleValidator], (req: any, res: Response) => CreateArticleController.main(req, res));
router.delete("/:id", [authorization], (req: any, res: Response) => DeleteArticleController.main(req, res));
//
export default router;
