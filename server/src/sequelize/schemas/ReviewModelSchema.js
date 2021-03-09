const { DataTypes } = require("sequelize");
const schema = {
    explanation: {
        type: DataTypes.STRING,
    },
    score: {
        type: DataTypes.FLOAT,
    },
    dealer_id: {
        type: DataTypes.INTEGER,
    },
    reviewer_id: {
        type: DataTypes.INTEGER,
    },
};
// set allowNull property to false for all schema fields
for (let key in schema) schema[key].allowNull = false;
//
schema.explanation.allowNull = true;
//
//
module.exports = schema;
