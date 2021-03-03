const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "UserModelSchema"));
const sequelize = require(path.join(__dirname, "..", "..", "services", "DB_Connection"));
//
//
//
class User extends Model {
    static associate(models) {
        // define association here
    }
}
User.init(modelSchema, {
    sequelize,
    modelName: "User",
});
module.exports = User;
