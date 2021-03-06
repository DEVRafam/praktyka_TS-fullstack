const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/OfferModelSchema");
//
module.exports = generateMigration("Offers", schema);
