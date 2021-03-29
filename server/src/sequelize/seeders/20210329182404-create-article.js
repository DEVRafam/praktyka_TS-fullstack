const path = require("path");
const fse = require("fs-extra");
const generateSeeder = require(path.join(__dirname, "..", "helpers", "generateSeeder"));
const { Article } = require(path.join("..", "models", "index"));
const data = fse.readJsonSync(path.join(__dirname, "data", "ArticlesData.json"));
//
//
//
module.exports = generateSeeder(Article, data, {
    imagesTemplate: path.join(__dirname, "data", "images", "articles"),
    uploadDir: path.join(__dirname, "..", "..", "..", "upload", "articles"),
});
