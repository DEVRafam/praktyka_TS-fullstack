const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/ReviewModelSchema");
//
module.exports = generateMigration("Reviews", schema);
