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
    mentioned_offers: {
        type: DataTypes.JSON,
    },
    content: {
        type: DataTypes.JSON,
    },
    tags: {
        type: DataTypes.JSON,
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
