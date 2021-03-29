import path from "path";
import fs from "fs";
import fse from "fs-extra";
//
import { Article, User } from "../../services/Models";
import { loggedUsers, usersData } from "../assets/user/data";
import { articleData } from "../assets/article/data";
import { LoginResponse } from "../../@types/auth";
import { createArticle } from "../helpers/createArticle";
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
        const { status } = await createArticle(loggedUsers.common.accessToken);
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
    //
    //
    it("2. Unlogged user should not be allowed to create an offer", async (done) => {
        const { status } = await createArticle("");
        expect(status).toEqual(401);
        //
        done();
    });
    //
    //
    //
    it("3. Article owner should be able to delete it", async (done) => {
        const article = await Article.findOne({ where: { title: articleData.title } });
        expect(article).not.toBeNull();
        expect(fs.existsSync(path.join(articleUploadPath, article.folder))).not.toBeFalsy();
        //
        const headers = {
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.delete(`/api/article/${article.id}`).set(headers);
        //
        expect(status).toEqual(200);
        expect(await Article.findOne({ where: { title: articleData.title } })).toBeNull();
        expect(fs.existsSync(path.join(articleUploadPath, article.folder))).toBeFalsy();
        //
        done();
    });
    //
    //
    //
    it("4. Admin should be able to delete any article", async (done) => {
        await createArticle(loggedUsers.common.accessToken);
        const article = await Article.findOne({ where: { title: articleData.title } });
        const headers = {
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.delete(`/api/article/${article.id}`).set(headers);
        //
        expect(status).toEqual(200);
        expect(await Article.findOne({ where: { title: articleData.title } })).toBeNull();
        expect(fs.existsSync(path.join(articleUploadPath, article.folder))).toBeFalsy();
        //
        done();
    });
    //
    //
    //
    it("5. User can not delete someone others article", async (done) => {
        await createArticle(loggedUsers.admin.accessToken);
        const article = await Article.findOne({ where: { title: articleData.title } });
        const headers = {
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.delete(`/api/article/${article.id}`).set(headers);
        //
        expect(status).toEqual(401);
        expect(await Article.findOne({ where: { title: articleData.title } })).not.toBeNull();
        expect(fs.existsSync(path.join(articleUploadPath, article.folder))).not.toBeFalsy();

        mocks.push({ model: "Article", id: article.id, folder: article.folder });
        //
        done();
    });
});
