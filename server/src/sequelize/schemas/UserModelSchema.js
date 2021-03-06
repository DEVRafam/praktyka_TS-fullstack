const { DataTypes } = require("sequelize");
const schema = {
    name: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM(["USER", "ADMIN"]),
        defaultValue: "USER",
    },
    tokens: {
        type: DataTypes.TEXT,
        defaultValue: "[]",
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
//
//
module.exports = schema;
