const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/FollowModelSchema");
//
module.exports = generateMigration("Follows", schema);
