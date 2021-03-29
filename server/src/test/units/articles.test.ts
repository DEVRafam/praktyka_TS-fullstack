import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { Article, User } from "../../services/Models";
import { loggedUsers, usersData } from "../assets/user/data";
import { articleData } from "../assets/article/data";
import { LoginResponse } from "../../@types/auth";
//
const articleUploadPath = path.join(__dirname, "..", "..", "..", "upload", "articles");
//
const mocks: { model: any; id: any; folder?: string }[] = [];
//
// tests
//
describe("Articles creating, deleting, and fetching data", () => {
    beforeAll(async (done) => {
        //
        // register new users
        //
        await (global as any).request.post("/api/auth/register").send(usersData.admin);
        await (global as any).request.post("/api/auth/register").send(usersData.common);
        //
        // log new users
        //
        const { body: adminBody }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: usersData.admin.email,
            password: usersData.admin.password,
        });
        loggedUsers.admin.id = adminBody.userData.id;
        loggedUsers.admin.accessToken = adminBody.tokens.accessToken;
        loggedUsers.admin.refreshToken = adminBody.tokens.refreshToken;
        await User.update({ role: "ADMIN" }, { where: { id: adminBody.userData.id } });
        mocks.push({ model: "User", id: adminBody.userData.id });
        //
        const { body: commonBody }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: usersData.common.email,
            password: usersData.common.password,
        });
        loggedUsers.common.id = commonBody.userData.id;
        loggedUsers.common.accessToken = commonBody.tokens.accessToken;
        loggedUsers.common.refreshToken = commonBody.tokens.refreshToken;
        mocks.push({ model: "User", id: commonBody.userData.id });
        //
        //
        //
        done();
    });
    //
    //
    //
    afterAll(async (done) => {
        for (let index in mocks) {
            const { model, id, folder } = mocks[index];
            if (model === "User") {
                await User.destroy({ where: { id: id } });
            } //
            else if (model === "Article") {
                await Article.destroy({ where: { id: id } });
                await fse.remove(path.join(articleUploadPath, folder));
            }
        }
        done();
    });
    //
    //
    //
    it("1. Logged user should be able to create an article", async (done) => {
        expect(await Article.findOne({ where: { title: articleData.title } })).toBeNull();
        //
        const headers = {
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request
            .post("/api/article")
            .set(headers) //
            .field("title", articleData.title)
            .field("mentioned_offers", JSON.stringify(articleData.mentioned_offers))
            .field("content", JSON.stringify(articleData.content))
            .field("tags", JSON.stringify(articleData.tags))
            .field("photos", JSON.stringify(articleData.photos))
            .attach("img1.jpg", path.join(__dirname, "..", "assets", "article", "sample_1.jpg"));
        //
        expect(status).toEqual(201);
        //
        const article = await Article.findOne({ where: { title: articleData.title } });
        expect(article).not.toBeNull();
        expect(true).toEqual(fs.existsSync(path.join(articleUploadPath, article.folder)));
        expect(1).toEqual(fs.readdirSync(path.join(articleUploadPath, article.folder)).length);
        //
        done();
    });
    //
    it("2. Unlogged user should not be allowed to create an offer", async (done) => {
        const { status } = await (global as any).request
            .post("/api/article") //
            .field("title", articleData.title)
            .field("mentioned_offers", JSON.stringify(articleData.mentioned_offers))
            .field("content", JSON.stringify(articleData.content))
            .field("tags", JSON.stringify(articleData.tags))
            .field("photos", JSON.stringify(articleData.photos))
            .attach("img1.jpg", path.join(__dirname, "..", "assets", "article", "sample_1.jpg"));
        expect(status).toEqual(401);
        //
        done();
    });
});
