console.clear();
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
// GraphQL
//
import graphQLConfig from "./graphql/apollo";
graphQLConfig(app);
//
app.listen(3000, () => {
    console.log(`⚡ App is running at port ${3000} `);
});
