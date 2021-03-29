const path = require("path");
const sequelize = require(path.join(__dirname, "..", "..", "services", "DB_Connection"));
// models
const User = require("./User")(sequelize);
const Offer = require("./Offer")(sequelize);
const Review = require("./Review")(sequelize);
const Follow = require("./Follow")(sequelize);
const Article = require("./Article")(sequelize);
const HighligtedArticle = require("./HighlightedArticle")(sequelize);
// relations
//
// offers
Offer.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
User.hasMany(Offer, { foreignKey: "creator_id", as: "offers" });
// reviews
Review.belongsTo(User, { foreignKey: "reviewer_id", as: "reviewer" });
Review.belongsTo(User, { foreignKey: "dealer_id", as: "dealer" });
User.hasMany(Review, { foreignKey: "reviewer_id", as: "reviews_about_others" });
User.hasMany(Review, { foreignKey: "dealer_id", as: "reviews_about_self" });
// follows
User.hasMany(Follow, { foreignKey: "user_id", as: "following" });
Follow.belongsTo(User, { foreignKey: "user_id", as: "followed_by" });
Offer.hasMany(Follow, { foreignKey: "offer_id", as: "follows" });
Follow.belongsTo(Offer, { foreignKey: "offer_id" });
// articles
Article.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
User.hasMany(Article, { foreignKey: "creator_id", as: "articles" });
HighligtedArticle.belongsTo(Article, { foreignKey: "article_id", as: "article" });
// result
module.exports = {
    User,
    Offer,
    Review,
    Follow,
    Article,
    HighligtedArticle,
};
