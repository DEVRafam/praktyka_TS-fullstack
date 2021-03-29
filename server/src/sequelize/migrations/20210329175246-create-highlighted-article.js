const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/HighlightedArticleModelSchema");
//
module.exports = generateMigration("HighlightedArticles", schema);
