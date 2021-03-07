const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "ReviewModelSchema"));
//
module.exports = (sequelize) => {
    class Review extends Model {}
    //
    Review.init(modelSchema, {
        sequelize,
        modelName: "Review",
        tableName: "Reviews",
    });
    return Review;
};
