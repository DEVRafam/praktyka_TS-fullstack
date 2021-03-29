import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { User, Offer, Follow } from "../../services/Models";
import { offerData } from "../assets/offer/data";
import { loggedUsers, usersData } from "../assets/user/data";
import { LoginResponse } from "../../@types/auth";
import { createOffer } from "../helpers/createOffer";
//
const offerUploadPath = path.join(__dirname, "..", "..", "..", "upload", "offers");
let deletedOfferID: number | null = null;
//
const mocks: { model: any; id: any; folder?: string }[] = [];
//
// tests
//
describe("Offers creating, deleting, and fetching data", () => {
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
            else if (model === "Offer") {
                await Offer.destroy({ where: { id: id } });
                await fse.remove(path.join(offerUploadPath, folder));
            }
        }
        done();
    });
    //
    //
    //
    it("1. Logged user should be able to create new offer", async (done) => {
        // COMMON CREATE OFFER
        const { status } = await createOffer(loggedUsers.common.accessToken);
        expect(status).toEqual(201);
        //
        const offer = await Offer.findOne({ where: { title: offerData.title, description: offerData.description } });
        expect(offer).not.toBeNull();
        //
        loggedUsers.common.createdOfferId = offer.id;
        loggedUsers.common.createdOfferFolder = offer.folder;
        expect(true).toEqual(fs.existsSync(path.join(offerUploadPath, offer.folder)));
        expect(offer.photos.length).toEqual(fs.readdirSync(path.join(offerUploadPath, offer.folder)).length);
        expect(offer.valueInUSD).toBeGreaterThan(1300);
        expect(offer.valueInUSD).toBeLessThan(1305);
        //
        done();
    });
    //
    //
    //
    it("2. Others users should be able to follow created offer", async (done) => {
        expect(await Follow.findOne({ where: { user_id: loggedUsers.admin.id, offer_id: loggedUsers.common.createdOfferId } })).toBeNull();
        //
        const headers = {
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.post(`/api/offer/${loggedUsers.common.createdOfferId}/follow`).set(headers);
        //
        expect(status).toEqual(200);
        expect(await Follow.findOne({ where: { user_id: loggedUsers.admin.id, offer_id: loggedUsers.common.createdOfferId } })).not.toBeNull();
        //
        done();
    });
    //
    //
    //
    it("3. Others users should be able to unfollow created offer", async (done) => {
        expect(await Follow.findOne({ where: { user_id: loggedUsers.admin.id, offer_id: loggedUsers.common.createdOfferId } })).not.toBeNull();
        //
        const headers = {
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            Accept: "application/json",
        };
        const { status } = await (global as any).request.post(`/api/offer/${loggedUsers.common.createdOfferId}/follow`).set(headers);
        expect(status).toEqual(200);
        expect(await Follow.findOne({ where: { user_id: loggedUsers.admin.id, offer_id: loggedUsers.common.createdOfferId } })).toBeNull();
        //
        // prepare follow for futher test
        //
        await (global as any).request.post(`/api/offer/${loggedUsers.common.createdOfferId}/follow`).set(headers);
        //
        done();
    });
    //
    //
    //
    it("4. Owner of offer should be able to delete it", async (done) => {
        const { status } = await (global as any).request.delete(`/api/offer/${loggedUsers.common.createdOfferId}`).set({
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
        });
        //
        expect(status).toEqual(200);
        expect(fs.existsSync(path.join(offerUploadPath, loggedUsers.common.createdOfferFolder))).toBeFalsy();
        expect(await Offer.findOne({ where: { id: loggedUsers.common.createdOfferId } })).toBeNull();
        //
        loggedUsers.common.createdOfferFolder = null;
        deletedOfferID = loggedUsers.common.createdOfferId;
        loggedUsers.common.createdOfferId = null;
        //
        done();
    });
    //
    //
    //
    it("5. Delete offer should also delete associated follows", async (done) => {
        expect(await Follow.findOne({ where: { user_id: loggedUsers.admin.id, offer_id: deletedOfferID } })).toBeNull();
        //
        done();
    });
    //
    //
    //
    it("6. Admin can delete any offer", async (done) => {
        await createOffer(loggedUsers.common.accessToken);
        const offer = await Offer.findOne({ where: { title: offerData.title, description: offerData.description } });
        //
        const { status } = await (global as any).request.delete(`/api/offer/${offer.id}`).set({
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
        });
        //
        expect(status).toEqual(200);
        expect(fs.existsSync(path.join(offerUploadPath, offer.folder))).toBeFalsy();
        expect(await Offer.findOne({ where: { id: offer.id } })).toBeNull();
        //
        done();
    });
    //
    //
    //
    it("7. User can not delete somoneone's else offer", async (done) => {
        await createOffer(loggedUsers.admin.accessToken);
        const offer = await Offer.findOne({ where: { title: offerData.title, description: offerData.description } });
        //
        const { status } = await (global as any).request.delete(`/api/offer/${offer.id}`).set({
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
        });
        //
        expect(status).toEqual(401);
        expect(fs.existsSync(path.join(offerUploadPath, offer.folder))).toBeTruthy();
        expect(await Offer.findOne({ where: { id: offer.id } })).not.toBeNull();
        //
        loggedUsers.admin.createdOfferId = offer.id;
        loggedUsers.admin.createdOfferFolder = offer.folder;
        mocks.push({ model: "Offer", id: offer.id, folder: offer.folder });
        //
        done();
    });
    //
    //
    //
    it("8. User should be able to change status of his offer", async (done) => {
        const where = { title: offerData.title, description: offerData.description };
        const offer = await Offer.findOne({ where });
        const { status } = await (global as any).request
            .post(`/api/offer/${offer.id}/change-status`)
            .set({
                Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            })
            .send({ status: "SOLD" });
        //
        expect(status).toEqual(200);
        expect((await Offer.findOne({ where })).status).toEqual("SOLD");
        //
        done();
    });
    //
    //
    //
    it("9. User should not be able to change status of someone others offer", async (done) => {
        const where = { title: offerData.title, description: offerData.description };
        const offer = await Offer.findOne({ where });
        const { status } = await (global as any).request
            .post(`/api/offer/${offer.id}/change-status`)
            .set({
                Authorization: `Bearer ${loggedUsers.common.accessToken}`,
            })
            .send({ status: "HIDDEN" });
        //
        expect(status).toEqual(401);
        expect((await Offer.findOne({ where })).status).toEqual(offer.status);
        //
        done();
    });
    //
    //
    //
    it("10. Admin should be able to change status of any offer", async (done) => {
        const where = { title: offerData.title, description: offerData.description };
        const offer = await Offer.findOne({ where });
        //
        await offer.update({ creator_id: loggedUsers.common.id });
        //
        const { status } = await (global as any).request
            .post(`/api/offer/${offer.id}/change-status`)
            .set({
                Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            })
            .send({ status: "HIDDEN" });
        //
        expect(status).toEqual(200);
        expect((await Offer.findOne({ where })).status).toEqual("HIDDEN");
        //
        done();
    });
    //
    //
    //
    it("11. User should not be able to ban his own offer", async (done) => {
        const where = { title: offerData.title, description: offerData.description };
        const offer = await Offer.findOne({ where });
        //
        const { status } = await (global as any).request
            .post(`/api/offer/${offer.id}/change-status`)
            .set({
                Authorization: `Bearer ${loggedUsers.common.accessToken}`,
            })
            .send({ status: "BANNED" });
        //
        expect(status).toEqual(401);
        expect((await Offer.findOne({ where })).status).not.toEqual("BANNED");
        //
        done();
    });
    //
    //
    //
    it("12. Admin should be able to ban any offer", async (done) => {
        const where = { title: offerData.title, description: offerData.description };
        const offer = await Offer.findOne({ where });
        //
        const { status } = await (global as any).request
            .post(`/api/offer/${offer.id}/change-status`)
            .set({
                Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            })
            .send({ status: "BANNED" });
        //
        expect(status).toEqual(200);
        expect((await Offer.findOne({ where })).status).toEqual("BANNED");
        //
        done();
    });
    //
    //
    //
    it("13. Unlogged user can not delete offer", async (done) => {
        const { status } = await (global as any).request.delete(`/api/offer/1`);
        expect(status).toEqual(401);
        //
        done();
    });
    //
    //
    //
    it("14. Unlogged user can not add offer", async (done) => {
        const { status } = await createOffer("");
        expect(status).toEqual(401);
        //
        done();
    });
    //
    //
    //
    it("15. Trying to delete unexisting offer should return code 404", async (done) => {
        const { status } = await (global as any).request.delete(`/api/offer/3123121`).set({
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
        });
        expect(status).toEqual(404);
        //
        done();
    });
    //
    //
    //
    it("16. Validators should return 400 code while trying to create offer with invalid data", async (done) => {
        const { body } = await (global as any).request
            .post("/api/offer")
            .set({
                Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
            })
            .send({
                title: "er",
                description: "Lorem ipsum ipsum lorem",
                price: "text",
                contact: JSON.stringify({
                    phone: "111 222 333",
                    fb: "https://www.npmjs.comasdasdasd asdasd asdsadas",
                }),
                photos: JSON.stringify(["img-one", "img-two"]),
                localization: "Budapeszt",
                currency: "PLN",
                country: "Hungary",
                advantages: JSON.stringify(["img-one", "img-two"]),
            });
        //
        expect(
            JSON.stringify([
                {
                    element: "title",
                    type: "min",
                    message: "Offer title must be at least 3 characters long",
                },
                {
                    element: "category",
                    type: "required",
                    message: "Category is required!",
                },
                {
                    element: "contact",
                    type: "invalid",
                    message: "Facebook link must start with 'https://www.facebook.com/profile'",
                },
                {
                    element: "price",
                    type: "base",
                    message: '"price" must be a number',
                },
            ])
        ).toEqual(JSON.stringify(body.errors));
        //
        done();
    });
    //
    //
    //
    it("17. Trying to fetch offer with status different than DEFAULT should retrun 404", async (done) => {
        await Offer.create({
            id: 5000,
            title: "Sprzedam komputer",
            category: "computer-and-games",
            description: "Lorem ipsum ipsum lorem",
            price: 5000,
            valueInUSD: 1303.28,
            currency: "PLN",
            contact: {
                phone: "111 222 333",
                fb: "https://www.facebook.com/Centrum-Kszta%C5%82cenia-Zawodowego-i-Ustawicznego-nr-2-w-Wadowicach-283938188765939",
            },
            photos: ["img-one", "img-two"],
            localization: "Budapeszt",
            country: "Hungary",
            creator_id: loggedUsers.common.id,
            slug: "dadasdasdasdasdasd",
            status: "HIDDEN",
            folder: "adas",
            advantages: ["FULL BATHROOMS: 5", "BEDROOMS: 7"],
        });
        //
        const { status } = await (global as any).request.get("/api/offer/dadasdasdasdasdasd");
        expect(status).toEqual(404);
        //
        mocks.push({ model: "Offer", id: 5000, folder: "adas" });
        //
        done();
    });
    //
    //
    //
    it("18. Admin should be allowed to fetch any kind of offer", async (done) => {
        const { status } = await (global as any).request.get("/api/offer/dadasdasdasdasdasd").set({
            Authorization: `Bearer ${loggedUsers.admin.accessToken}`,
        });
        expect(status).toEqual(200);
        //
        done();
    });
    //
    //
    //
    it("19. Offer's owner should be allowed to fetch his offer", async (done) => {
        const { status } = await (global as any).request.get("/api/offer/dadasdasdasdasdasd").set({
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
        });
        expect(status).toEqual(200);
        //
        done();
    });
    //
    //
    //
    it("20. Random should not be allowed to fetch offer with status different than DEFAULT", async (done) => {
        await Offer.update({ creator_id: loggedUsers.admin.id }, { where: { id: 5000 } });
        //
        const { status } = await (global as any).request.get("/api/offer/dadasdasdasdasdasd").set({
            Authorization: `Bearer ${loggedUsers.common.accessToken}`,
        });
        expect(status).toEqual(404);
        //
        done();
    });
});
