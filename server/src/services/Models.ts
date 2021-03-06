import path from "path";
//
const { User: u, Offer: o } = require(path.join(__dirname, "..", "sequelize", "models", "index"));
//
export const User = u;
export const Offer = o;
