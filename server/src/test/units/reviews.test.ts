import { LoginResponse } from "../../@types/auth";
import { User, Review } from "../../services/Models";
import { usersData, loggedUsers } from "../assets/review/data";
import { Op } from "sequelize";
//
// tests
//
describe("Offers creating, deleting, and fetching data", () => {
    //
    beforeAll(async (done) => {
        // register & login new user
        //
        // first
        //
        await (global as any).request.post("/api/auth/register").send(usersData.one);
        const { body: bodyOne }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: usersData.one.email,
            password: usersData.one.password,
        });
        await User.update({ role: "ADMIN" }, { where: { id: bodyOne.userData.id } });
        loggedUsers.one.id = bodyOne.userData.id;
        loggedUsers.one.accessToken = bodyOne.tokens.accessToken;
        //
        // second
        //
        await (global as any).request.post("/api/auth/register").send(usersData.two);
        const { body: bodyTwo }: { body: LoginResponse } = await (global as any).request.post("/api/auth/login").send({
            email: usersData.two.email,
            password: usersData.two.password,
        });
        loggedUsers.two.id = bodyTwo.userData.id;
        loggedUsers.two.accessToken = bodyTwo.tokens.accessToken;
        //
        //
        //
        done();
    });
    //
    //
    //
    afterAll(async (done) => {
        await User.destroy({
            where: {
                id: { [Op.or]: [loggedUsers.one.id, loggedUsers.two.id] },
            },
        });
        await Review.destroy({
            where: {
                [Op.or]: [
                    {
                        reviewer_id: loggedUsers.one.id,
                        dealer_id: loggedUsers.two.id,
                    },
                    {
                        reviewer_id: loggedUsers.two.id,
                        dealer_id: loggedUsers.one.id,
                    },
                ],
            },
        });
        //
        done();
    });
    //
    //
    //
    it("1. Logged user should be allowed to review other users WITHOUT PASSING EXPLANATION", async (done) => {
        const SCORE = 1;
        //
        const { status } = await (global as any).request
            .post(`/api/review/${loggedUsers.two.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ score: SCORE });
        //
        expect(status).toEqual(200);
        expect(
            await Review.findOne({
                where: {
                    reviewer_id: loggedUsers.one.id,
                    dealer_id: loggedUsers.two.id,
                    score: SCORE,
                },
            })
        ).not.toBeNull();
        //
        done();
    });
    //
    //
    //
    it("2. Logged user should be allowed to review other users WITH PASSING EXPLANATION", async (done) => {
        const EXPLANATION = "Lorem ipsum review";
        const SCORE = 3;
        //
        const { status } = await (global as any).request
            .post(`/api/review/${loggedUsers.two.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ score: SCORE, explanation: EXPLANATION });
        //
        expect(status).toEqual(200);
        expect(
            await Review.findOne({
                where: {
                    reviewer_id: loggedUsers.one.id,
                    dealer_id: loggedUsers.two.id,
                    explanation: EXPLANATION,
                    score: SCORE,
                },
            })
        ).not.toBeNull();
        //
        done();
    });
    //
    //
    //
    it("3. Logged user should NOT be allowed to review other users WITHOUT PASSING SCORE", async (done) => {
        const EXPLANATION = "Lorem ipsum review UPDATED";
        //
        const { body } = await (global as any).request
            .post(`/api/review/${loggedUsers.two.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ explanation: EXPLANATION });
        //
        expect(body.result).toEqual("negative");
        expect(JSON.stringify(body.errors)).toContain(
            JSON.stringify([
                {
                    element: "score",
                    type: "required",
                    message: "Score is required!",
                },
            ])
        );
        //
        done();
    });
    //
    //
    //
    it("4. Trying to review unexisting dealer should return 404 code", async (done) => {
        const SCORE = 5;
        //
        const { status } = await (global as any).request
            .post(`/api/review/1233456`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ score: SCORE });
        //
        expect(status).toEqual(404);
        //
        done();
    });
    //
    //
    //
    it("5. User should not be allowed to review himself", async (done) => {
        const SCORE = 4;
        //
        const { status } = await (global as any).request
            .post(`/api/review/${loggedUsers.one.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ score: SCORE });
        //
        expect(status).toEqual(400);
        //
        done();
    });
    //
    //
    //
    it("6. Unlogged user should not be allowed to review anybody", async (done) => {
        const SCORE = 4;
        //
        const { status } = await (global as any).request.post(`/api/review/${loggedUsers.one.id}`).send({ score: SCORE });
        //
        expect(status).toEqual(401);
        //
        done();
    });
    //
    //
    //
    it("7. User as reviewer should be able to delete his review", async (done) => {
        const review = await Review.findOne({
            where: {
                reviewer_id: loggedUsers.one.id,
                dealer_id: loggedUsers.two.id,
            },
        });
        const { status } = await (global as any).request.delete(`/api/review/${review.id}`).set({
            Authorization: `Bearer ${loggedUsers.one.accessToken}`,
        });
        //
        expect(status).toEqual(200);
        expect(await Review.findOne({ where: { id: review.id } })).toBeNull();

        //
        done();
    });
    //
    //
    //
    it("8. Admin should be able to delete any review", async (done) => {
        //
        // PREPARE REVIEW
        //
        const EXPLANATION = "Lorem ipsum review";
        const SCORE = 3;
        await (global as any).request
            .post(`/api/review/${loggedUsers.one.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.two.accessToken}`,
            })
            .send({ score: SCORE, explanation: EXPLANATION });
        //
        // DELETING
        //
        const review = await Review.findOne({
            where: {
                reviewer_id: loggedUsers.two.id,
                dealer_id: loggedUsers.one.id,
            },
        });
        const { status } = await (global as any).request.delete(`/api/review/${review.id}`).set({
            Authorization: `Bearer ${loggedUsers.one.accessToken}`,
        });
        //
        expect(status).toEqual(200);
        expect(await Review.findOne({ where: { id: review.id } })).toBeNull();
        //
        done();
    });
    //
    //
    //
    it("9. User should not be able to delete someone others review", async (done) => {
        //
        // PREPARE REVIEW
        //
        const EXPLANATION = "Lorem ipsum review";
        const SCORE = 3;
        await (global as any).request
            .post(`/api/review/${loggedUsers.two.id}`)
            .set({
                Authorization: `Bearer ${loggedUsers.one.accessToken}`,
            })
            .send({ score: SCORE, explanation: EXPLANATION });
        //
        // DELETING
        //
        const review = await Review.findOne({
            where: {
                reviewer_id: loggedUsers.one.id,
                dealer_id: loggedUsers.two.id,
            },
        });
        const { status } = await (global as any).request.delete(`/api/review/${review.id}`).set({
            Authorization: `Bearer ${loggedUsers.two.accessToken}`,
        });
        //
        expect(status).toEqual(401);
        //
        done();
    });
    //
    //
    //
    it("10. Trying to delete unexisting review should return code 404", async (done) => {
        const { status } = await (global as any).request.delete(`/api/review/2423423`).set({
            Authorization: `Bearer ${loggedUsers.one.accessToken}`,
        });
        //
        expect(status).toEqual(404);
        //
        done();
    });
    //
    //
    //
    it("11. Unlogged user should not be allowed to delete any review", async (done) => {
        const review = await Review.findOne({
            where: {
                reviewer_id: loggedUsers.one.id,
                dealer_id: loggedUsers.two.id,
            },
        });
        const { status } = await (global as any).request.delete(`/api/review/${review.id}`);
        //
        expect(status).toEqual(401);
        expect(await Review.findOne({ where: { id: review.id } })).not.toBeNull();
        //
        done();
    });
});
