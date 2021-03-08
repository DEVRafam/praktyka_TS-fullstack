import supertest from "supertest";
import app from "../app";
//
// jest.setTimeout(10000);
//
(global as any).someString = "JEBAC GORZEN";
(global as any).request = supertest(app);
