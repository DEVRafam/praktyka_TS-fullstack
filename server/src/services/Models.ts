import path from "path";
//
const { User: u, Offer: o, Review: r, Follow: f, Article: a } = require(path.join(__dirname, "..", "sequelize", "models", "index"));
//
export const User = u;
export const Offer = o;
export const Review = r;
export const Follow = f;
export const Article = a;
