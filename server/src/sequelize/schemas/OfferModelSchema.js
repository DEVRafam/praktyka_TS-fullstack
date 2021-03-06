const { DataTypes } = require("sequelize");
const schema = {
    title: {
        type: DataTypes.STRING,
    },
    categories: {
        type: DataTypes.JSON,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
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
    status: {
        type: DataTypes.ENUM(["DEFAULT", "SOLD", "BANNED", "HIDDEN"]),
        defaultValue: "DEFAULT",
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
//
//
module.exports = schema;
