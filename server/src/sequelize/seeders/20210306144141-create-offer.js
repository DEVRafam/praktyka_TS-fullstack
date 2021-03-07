const path = require("path");
const fse = require("fs-extra");
const generateSeeder = require(path.join(__dirname, "..", "helpers", "generateSeeder"));
const { Offer } = require(path.join("..", "models", "index"));
const data = fse.readJsonSync(path.join(__dirname, "data", "OffersData.json"));
//
//
//
module.exports = generateSeeder(Offer, data, {
    imagesTemplate: path.join(__dirname, "data", "images", "offers"),
    uploadDir: path.join(__dirname, "..", "..", "..", "upload", "offers"),
});
