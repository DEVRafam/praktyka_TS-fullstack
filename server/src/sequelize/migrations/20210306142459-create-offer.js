const path = require("path");
const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/OfferModelSchema");
const dirPath = path.join(__dirname, "..", "..", "..", "upload", "offers");
//
module.exports = generateMigration("Offers", schema, dirPath);
