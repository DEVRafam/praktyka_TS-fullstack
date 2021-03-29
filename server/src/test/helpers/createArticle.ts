import path from "path";
import { articleData } from "../assets/article/data";
//
//
//
export const createArticle = async (token: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
    //
    return await (global as any).request
        .post("/api/article")
        .set(headers) //
        .field("title", articleData.title)
        .field("mentioned_offers", JSON.stringify(articleData.mentioned_offers))
        .field("content", JSON.stringify(articleData.content))
        .field("tags", JSON.stringify(articleData.tags))
        .field("photos", JSON.stringify(articleData.photos))
        .attach("img1.jpg", path.join(__dirname, "..", "assets", "article", "sample_1.jpg"));
};
