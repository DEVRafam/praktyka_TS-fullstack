const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "HighlightedArticleModelSchema"));
//
module.exports = (sequelize) => {
    class HighlightedArticle extends Model {}
    //
    HighlightedArticle.init(modelSchema, {
        sequelize,
        modelName: "HighlightedArticle",
        tableName: "HighlightedArticles",
    });
    return HighlightedArticle;
};
