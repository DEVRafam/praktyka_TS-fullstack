import supertest from "supertest";
import app from "../app";
//
(global as any).someString = "JEBAC GORZEN";
(global as any).request = supertest(app);
