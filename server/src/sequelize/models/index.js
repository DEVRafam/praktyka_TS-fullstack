const path = require("path");
const sequelize = require(path.join(__dirname, "..", "..", "services", "DB_Connection"));
// models
const User = require("./User")(sequelize);
const Offer = require("./Offer")(sequelize);
const Review = require("./Review")(sequelize);
// relations
Offer.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
User.hasMany(Offer, { foreignKey: "creator_id", as: "offers" });
Review.belongsTo(User, { foreignKey: "reviewer_id", as: "reviewer" });
Review.belongsTo(User, { foreignKey: "dealer_id", as: "dealer" });
User.hasMany(Review, { foreignKey: "reviewer_id", as: "reviews_about_others" });
User.hasMany(Review, { foreignKey: "dealer_id", as: "reviews_about_self" });
// result
module.exports = {
    User,
    Offer,
    Review,
};
