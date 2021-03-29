const { Model } = require("sequelize");
const path = require("path");
const modelSchema = require(path.join(__dirname, "..", "schemas", "OfferModelSchema"));
//
module.exports = (sequelize) => {
    class Offer extends Model {}
    //
    Offer.init(modelSchema, {
        sequelize,
        modelName: "Offer",
    });
    return Offer;
};
