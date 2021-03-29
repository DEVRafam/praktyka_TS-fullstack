const path = require("path");
const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/ArticleModelSchema");
const dirPath = path.join(__dirname, "..", "..", "..", "upload", "articles");
//
module.exports = generateMigration("Articles", schema, dirPath);
