const { DataTypes } = require("sequelize");
const schema = {
    title: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        // generated automatically
    },
    creator_id: {
        type: DataTypes.INTEGER,
        // generated automatically
    },
    category: {
        type: DataTypes.ENUM("services", "automotive", "education", "sport", "fashion", "electronic", "real-estate", "job", "house-and-garden", "computer-and-games"),
    },
    description: {
        type: DataTypes.TEXT,
    },
    advantages: {
        type: DataTypes.JSON,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    currency: {
        type: DataTypes.ENUM("PLN", "EUR", "USD", "GBP"),
    },
    valueInUSD: {
        type: DataTypes.FLOAT,
        // generated automatically
    },
    contact: {
        type: DataTypes.JSON,
    },
    photos: {
        type: DataTypes.JSON,
    },
    localization: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM(["DEFAULT", "SOLD", "BANNED", "HIDDEN"]),
        defaultValue: "DEFAULT",
        // generated automatically
    },
    folder: {
        type: DataTypes.STRING,
        // generated automatically
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
//
//
module.exports = schema;
