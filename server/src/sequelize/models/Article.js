const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "ArticleModelSchema"));
//
module.exports = (sequelize) => {
    class Article extends Model {}
    //
    Article.init(modelSchema, {
        sequelize,
        modelName: "Article",
    });
    return Article;
};
