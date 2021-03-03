const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/UserModelSchema");
//
module.exports = generateMigration("Users", schema);
