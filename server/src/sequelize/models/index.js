const path = require("path");
const sequelize = require(path.join(__dirname, "..", "..", "services", "DB_Connection"));
// models
const User = require("./User")(sequelize);
const Offer = require("./Offer")(sequelize);
// relations
Offer.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
User.hasMany(Offer, { foreignKey: "creator_id", as: "offers" });
// result
module.exports = {
    User,
    Offer,
};
