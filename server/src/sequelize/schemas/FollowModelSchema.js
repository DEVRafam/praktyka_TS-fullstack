const { DataTypes } = require("sequelize");
const schema = {
    user_id: {
        type: DataTypes.INTEGER,
    },
    offer_id: {
        type: DataTypes.INTEGER,
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
module.exports = schema;
