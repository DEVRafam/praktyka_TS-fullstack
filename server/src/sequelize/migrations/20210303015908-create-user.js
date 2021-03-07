const path = require("path");
const generateMigration = require("../helpers/genereateMigration");
const schema = require("../schemas/UserModelSchema");
const dirPath = path.join(__dirname, "..", "..", "..", "upload", "avatars");

//
module.exports = generateMigration("Users", schema, dirPath);
