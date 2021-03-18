import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User, Offer, Review, Follow } from "../../services/Models";
import { LoginResponse, RefreshTokenResponse } from "../../@types/auth";
import { createOffer } from "../helpers/createOffer";
//
// data to use
//
const avatarsUploadPath = path.join(__dirname, "..", "..", "..", "upload", "avatars");
const offersUploadPath = path.join(__dirname, "..", "..", "..", "upload", "offers");
//
const fakeUserData = {
    name: "Sample",
    surname: "Elpmas",
    email: "sample@gmail.com",
    password: "zaq12345",
    repeat_password: "zaq12345",
};
const loggedUser = {
    id: null as null | number,
    accessToken: "",
    refreshToken: "",
};
let registerStatus: number | null = null;
//
// tests
//
describe("User's register/login/authenticate/avatar changing/account deleting", () => {
    beforeAll(async (done) => {
        const { status } = await (global as any).request.post("/api/auth/register").send(fakeUserData);
        registerStatus = status;
        //
        await User.create({
            id: 5000,
            name: "User one",
            surname: "Still user one",
            email: "email-one@gmail.com",
            password: await bcrypt.hash("12345678", await bcrypt.genSalt()),
        });
        //
        await User.create({
            id: 5001,
            name: "User one",
            surname: "Still user one",
            email: "email-two@gmail.com",
            role: "ADMIN",
            password: await bcrypt.hash("87654321", await bcrypt.genSalt()),
        });
        //
        done();
    });
    //
    afterAll(async (done) => {
        await User.destroy({
            where: {
                id: {
                    [Op.or]: [loggedUser.id, 5001],
                },
            },
        });
        //
        done();
    });
    //
    it("1. User should has been created successfully and now can login", async (done) => {
        expect(registerStatus).toEqual(201);
        // try to login
        const { body }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: fakeUserData.email,
            password: fakeUserData.password,
        });
        //
        loggedUser.accessToken = body.tokens.accessToken;
        loggedUser.refreshToken = body.tokens.refreshToken;
        loggedUser.id = body.userData.id;
        //
        expect(body.result).toEqual("positive");
        expect(body.errors).toBeUndefined();
        //
        done();
    });
    //
    it("2. Refresh token should be added to the DB after successfully login", async (done) => {
        const user = await User.findOne({ where: { id: loggedUser.id } });
        expect(JSON.parse(user.tokens)).toContain(loggedUser.refreshToken);
        //
        done();
    });
    //
    it("3. Logged user should be able to access pages that require authorization", async (done) => {
        const headers = {
            Authorization: `Bearer ${loggedUser.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.get("/api/auth/authorization-test").set(headers);
        expect(status).toEqual(200);
        //
        done();
    });
    //
    it("4. Unlogged user shouldn't be allowed to entry restricted access pages", async (done) => {
        const { status } = await (global as any).request.get("/api/auth/authorization-test");
        expect(status).toEqual(401);
        //
        done();
    });
    //
    it("5. Logged user should be able to refresh access token", async (done) => {
        const { status, body }: { body: RefreshTokenResponse; status: any } = await (global as any).request.post("/api/auth/refresh-token").send({
            refreshToken: loggedUser.refreshToken,
            accessToken: loggedUser.accessToken,
        });
        //
        expect(status).toEqual(200);
        expect(body.result).toEqual("positive");
        expect(body.accessToken).not.toBeUndefined();
        //
        done();
    });
    //
    it("6. Logged user should be able to logout", async (done) => {
        const { refreshToken, id, accessToken } = loggedUser;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.post("/api/auth/logout").set(headers).send({
            refreshToken: refreshToken,
        });
        expect(status).toEqual(200);
        //
        const user = await User.findOne({ where: { id: id } });
        expect(JSON.parse(user.tokens)).not.toContain(refreshToken);
        //
        done();
    });
    //
    it("7. Trying to refresh token via passing invalid credentials should return code 400", async (done) => {
        const { status, body }: { body: RefreshTokenResponse; status: any } = await (global as any).request.post("/api/auth/refresh-token").send({
            refreshToken: loggedUser.refreshToken,
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiQyYiQxMCRMUm5yc2NFZXVYdmFURzUwTFppcFVlaHlqT2xsa2JXN0hySlMyWEkzSDR3YnFtbEExdWZ6aSIsImlkIjoxLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTA2VDAyOjE0OjM5LjMyNFoiLCJpYXQiOjE2MTQ5OTY4ODgsImV4cCI6MTYxNDk5Nzc4OH0.7X-KXOLci2gDPPQg0ni068yKoEr4xIbrrUJz2j5hcIk",
        });
        //
        expect(status).toEqual(400);
        expect(body.accessToken).toBeUndefined();
        //
        done();
    });
    //
    it("8. Trying to refresh token via passing valid credentials, but refresh token does not exist in the database should return code 400", async (done) => {
        const { refreshToken, accessToken } = loggedUser;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.post("/api/auth/logout").set(headers).send({
            refreshToken: refreshToken,
        });
        expect(status).toEqual(400);
        //
        done();
    });
    //
    it("9. User should be able to change his avatar", async (done) => {
        expect(await User.findOne({ where: { id: loggedUser.id } }).avatar).toBeFalsy();
        //
        const { accessToken } = loggedUser;
        const { status }: { status: any } = await (global as any).request
            .post(`/api/user/change-avatar`)
            .set({
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            }) //
            .attach("avatar", path.join(__dirname, "..", "assets", "avatar.jpg"));
        //
        expect(status).toEqual(200);
        // check if avatar was saved insinde avatas directory
        const user = await User.findOne({ where: { id: loggedUser.id } });
        expect(user.avatar).not.toBeFalsy();
        expect(fs.existsSync(path.join(avatarsUploadPath, user.avatar))).not.toBeFalsy();
        //
        done();
    });
    //
    it("10. User shouldn't be able to change somenone others avatar", async (done) => {
        const OTHER_USER_ID = 5000;
        expect(await User.findOne({ where: { id: OTHER_USER_ID } }).avatar).toBeFalsy();
        //
        const { accessToken } = loggedUser;
        const { status }: { status: any } = await (global as any).request
            .post(`/api/user/change-avatar?user=${OTHER_USER_ID}`)
            .set({
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            }) //
            .attach("avatar", path.join(__dirname, "..", "assets", "avatar.jpg"));
        //
        expect(status).toEqual(401);
        expect(await User.findOne({ where: { id: OTHER_USER_ID } }).avatar).toBeFalsy();
        //
        done();
    });
    //
    it("11. Admin should be able to change somenone others avatar", async (done) => {
        const OTHER_USER_ID = 5000;
        expect(await User.findOne({ where: { id: OTHER_USER_ID } }).avatar).toBeFalsy();
        await User.update({ role: "ADMIN" }, { where: { id: loggedUser.id } });
        //
        const { accessToken } = loggedUser;
        const { status }: { status: any } = await (global as any).request
            .post(`/api/user/change-avatar?user=${OTHER_USER_ID}`)
            .set({
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            }) //
            .attach("avatar", path.join(__dirname, "..", "assets", "avatar.jpg"));
        //
        expect(status).toEqual(200);
        const otherUser = await User.findOne({ where: { id: OTHER_USER_ID } });
        expect(otherUser.avatar).not.toBeFalsy();
        expect(fs.existsSync(path.join(avatarsUploadPath, otherUser.avatar))).not.toBeFalsy();
        //
        done();
    });
    //
    it("11. Trying to change avatar of unexisting user should thorw 404", async (done) => {
        const OTHER_USER_ID = 99999;
        //
        const { accessToken } = loggedUser;
        const { status }: { status: any } = await (global as any).request
            .post(`/api/user/change-avatar?user=${OTHER_USER_ID}`)
            .set({
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            }) //
            .attach("avatar", path.join(__dirname, "..", "assets", "avatar.jpg"));
        //
        expect(status).toEqual(404);
        //
        done();
    });
    //
    it("12. Trying to change avatar without passing avatar file should throw 400", async (done) => {
        const OTHER_USER_ID = 5000;
        //
        const { accessToken } = loggedUser;
        const { status }: { status: any } = await (global as any).request.post(`/api/user/change-avatar?user=${OTHER_USER_ID}`).set({
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        });
        //
        expect(status).toEqual(400);
        //
        done();
    });
    //
    it("12. Trying to delete account via passing invalid credentials should return 400 error", async (done) => {
        const { id, accessToken } = loggedUser;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        //
        expect(await User.findOne({ where: { id: loggedUser.id } })).not.toBeNull();
        const { status }: { status: any } = await (global as any).request.post(`/api/user/${id}/delete`).set(headers).send({
            password: "bad password",
            email: "bad_email@gmail.com",
        });
        expect(status).toEqual(400);
        expect(await User.findOne({ where: { id: loggedUser.id } })).not.toBeNull();
        //
        done();
    });
    //
    it("13. Trying to delete account by unauthenticated user should retrun 401 status", async (done) => {
        const { id } = loggedUser;
        //
        expect(await User.findOne({ where: { id: loggedUser.id } })).not.toBeNull();
        const { status }: { status: any } = await (global as any).request.post(`/api/user/${id}/delete`).send({
            password: fakeUserData.password,
            repeat_password: fakeUserData.password,
            email: fakeUserData.email,
        });
        expect(status).toEqual(401);
        expect(await User.findOne({ where: { id: loggedUser.id } })).not.toBeNull();
        //
        done();
    });
    //
    it("14. User should be able to delete his account with every single associated review, offer and follow", async (done) => {
        // prepare offer
        await createOffer(loggedUser.accessToken);
        const offer = await Offer.findOne({ where: { creator_id: loggedUser.id } });
        expect(fs.existsSync(path.join(offersUploadPath, offer.folder))).toBeTruthy();
        // prepare review
        await Review.create({
            score: 5,
            dealer_id: loggedUser.id,
            reviewer_id: 99999,
        });
        await Review.create({
            score: 5,
            reviewer_id: loggedUser.id,
            dealer_id: 99999,
        });
        // prepare follow
        // user that will be deleted and unexisting offer
        await Follow.create({
            user_id: loggedUser.id,
            offer_id: 99999,
        });
        // unexisting user and offer, that user to delete owns
        await Follow.create({
            user_id: 99999,
            offer_id: offer.id,
        });
        //
        expect(await Review.findOne({ where: { dealer_id: loggedUser.id } })).not.toBeNull();
        expect(await Review.findOne({ where: { reviewer_id: loggedUser.id } })).not.toBeNull();
        expect(await Follow.findOne({ where: { user_id: loggedUser.id } })).not.toBeNull();
        expect(await Follow.findOne({ where: { offer_id: offer.id } })).not.toBeNull();
        expect(await Offer.findOne({ where: { creator_id: loggedUser.id } })).not.toBeNull();
        //
        // delete request
        //
        const { id, accessToken } = loggedUser;
        const userAvatar = (await User.findOne({ where: { id: id } })).avatar;
        //
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        };
        //
        const { status }: { status: any } = await (global as any).request.post(`/api/user/${id}/delete`).set(headers).send({
            password: fakeUserData.password,
            repeat_password: fakeUserData.password,
            email: fakeUserData.email,
        });
        //
        expect(status).toEqual(200);
        expect(await User.findOne({ where: { id } })).toBeNull();
        expect(await Review.findOne({ where: { dealer_id: loggedUser.id } })).toBeNull();
        expect(await Review.findOne({ where: { reviewer_id: loggedUser.id } })).toBeNull();
        expect(await Follow.findOne({ where: { user_id: loggedUser.id } })).toBeNull();
        expect(await Follow.findOne({ where: { offer_id: offer.id } })).toBeNull();
        expect(await Offer.findOne({ where: { creator_id: loggedUser.id } })).toBeNull();
        //
        expect(fs.existsSync(path.join(avatarsUploadPath, userAvatar))).toBeFalsy();
        expect(fs.existsSync(path.join(offersUploadPath, offer.folder))).toBeFalsy();
        //
        done();
    });
    //
    it("15. User shouldn't be able to delete someone others account", async (done) => {
        //
        const { body }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: "email-one@gmail.com",
            password: "12345678",
        });
        //
        loggedUser.accessToken = body.tokens.accessToken;
        loggedUser.refreshToken = body.tokens.refreshToken;
        loggedUser.id = body.userData.id;
        //
        const headers = {
            Authorization: `Bearer ${body.tokens.accessToken}`,
            Accept: "application/json",
        };
        //
        const { status }: { status: any } = await (global as any).request.post(`/api/user/${5001}/delete`).set(headers).send({
            email: "email-one@gmail.com",
            password: "12345678",
            repeat_password: "12345678",
        });
        //
        expect(status).toEqual(401);
        expect(await User.findOne({ where: { id: 5001 } })).not.toBeNull();
        done();
    });
    //
    it("16. Admin should be able to delete any other user", async (done) => {
        await User.update({ role: "ADMIN" }, { where: { id: 5000 } });
        //
        const headers = {
            Authorization: `Bearer ${loggedUser.accessToken} `,
            Accept: "application/json",
        };
        //
        const { status }: { status: any } = await (global as any).request.post(`/api/user/${5001}/delete`).set(headers).send({
            email: "email-one@gmail.com",
            password: "12345678",
            repeat_password: "12345678",
        });
        //
        expect(status).toEqual(200);
        expect(await User.findOne({ where: { id: 5001 } })).toBeNull();
        done();
    });
});
