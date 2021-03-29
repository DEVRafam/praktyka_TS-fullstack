const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "UserModelSchema"));
//
module.exports = (sequelize) => {
    class User extends Model {}
    User.init(modelSchema, {
        sequelize,
        modelName: "User",
    });
    //
    return User;
};
