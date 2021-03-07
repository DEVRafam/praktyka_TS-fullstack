const path = require("path");
const fse = require("fs-extra");
const { Review } = require(path.join("..", "models", "index"));
const generateSeeder = require(path.join(__dirname, "..", "helpers", "generateSeeder"));
const data = fse.readJsonSync(path.join(__dirname, "data", "ReviewsData.json"));
//
//
//
module.exports = generateSeeder(Review, data);
