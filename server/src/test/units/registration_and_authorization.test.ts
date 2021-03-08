import { User } from "../../services/Models";
import { LoginResponse, RefreshTokenResponse } from "../../@types/auth";
//
// data to use
//
const fakeUserData = {
    name: "Sample",
    surname: "Elpmas",
    email: "sample@gmail.com",
    password: "zaq12345",
    repeat_password: "zaq12345",
};
const userData = {
    id: null as null | number,
    accessToken: "",
    refreshToken: "",
};
let registerStatus: number | null = null;
//
// tests
//
describe("User's register and further authorization tests", () => {
    beforeAll(async (done) => {
        const { status } = await (global as any).request.post("/api/auth/register").send(fakeUserData);
        registerStatus = status;
        //
        done();
    });
    //
    afterAll(async (done) => {
        const user = await User.findOne({ where: { id: userData.id } });
        await user.destroy();
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
        userData.accessToken = body.tokens.accessToken;
        userData.refreshToken = body.tokens.refreshToken;
        userData.id = body.userData.id;
        //
        expect(body.status).toEqual("positive");
        expect(body.errors).toBeUndefined();
        //
        done();
    });
    it("2. Refresh token should be added to the DB after successfully login", async (done) => {
        const user = await User.findOne({ where: { id: userData.id } });
        expect(JSON.parse(user.tokens)).toContain(userData.refreshToken);
        //
        done();
    });
    //
    it("3. Logged user should be able to access pages that require authorization", async (done) => {
        const headers = {
            Authorization: `Bearer ${userData.accessToken}`,
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
            refreshToken: userData.refreshToken,
            accessToken: userData.accessToken,
        });
        //
        expect(status).toEqual(200);
        expect(body.status).toEqual("positive");
        expect(body.accessToken).not.toBeUndefined();
        //
        done();
    });
    //
    it("6. Logged user should be able to logout", async (done) => {
        const { refreshToken, id, accessToken } = userData;
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
    it("7. Trying to refresh token via passing invalid ones should return code 400", async (done) => {
        const { status, body }: { body: RefreshTokenResponse; status: any } = await (global as any).request.post("/api/auth/refresh-token").send({
            refreshToken: userData.refreshToken,
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
    it("8. Trying to refresh token via passing valid ones, but refresh token does not exist in the database should return code 400", async (done) => {
        const { refreshToken, accessToken } = userData;
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
});
