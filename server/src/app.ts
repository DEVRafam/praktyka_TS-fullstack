import express from "express";
const app = express();
//
// packages
//
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
//
// functions
//
import router from "./router/router_index";
app.use("/api", router);
//
//
//
export default app;
