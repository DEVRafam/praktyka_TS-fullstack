const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "FollowModelSchema"));
//
module.exports = (sequelize) => {
    class Follow extends Model {}
    //
    Follow.init(modelSchema, {
        sequelize,
        modelName: "Follow",
        tableName: "Follows",
    });
    return Follow;
};
