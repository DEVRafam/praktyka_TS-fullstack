const { DataTypes } = require("sequelize");
const schema = {
    title: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    advantages: {
        type: DataTypes.JSON,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    currency: {
        type: DataTypes.STRING,
    },
    creator_id: {
        type: DataTypes.INTEGER,
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
    },
    folder: {
        type: DataTypes.STRING,
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
//
//
module.exports = schema;
