const path = require("path");
const fse = require("fs-extra");
const { HighligtedArticle } = require(path.join("..", "models", "index"));
const generateSeeder = require(path.join(__dirname, "..", "helpers", "generateSeeder"));
const data = fse.readJsonSync(path.join(__dirname, "data", "HighligtedArticles.json"));
//
//
//
module.exports = generateSeeder(HighligtedArticle, data);
