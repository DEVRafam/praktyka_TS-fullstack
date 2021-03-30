import path from "path";
const base = require(path.join(__dirname, "config_base"));
export default base;
//
export const APP_PORT = base.APP_PORT;
export const tokens = base.tokens;
export const database = base.database;
export const ARTICLES_PER_PAGE = base.ARTICLES_PER_PAGE;
export const OFFERS_PER_PAGE = base.OFFERS_PER_PAGE;
