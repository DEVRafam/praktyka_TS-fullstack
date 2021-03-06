const path = require("path");
const fse = require("fs-extra");
const generateSeeder = require(path.join(__dirname, "..", "helpers", "generateSeeder"));
const { User } = require(path.join("..", "models", "index"));
const data = fse.readJsonSync(path.join(__dirname, "data", "UsersData.json"));
//
//
//
module.exports = generateSeeder(User, data, { user: true });
