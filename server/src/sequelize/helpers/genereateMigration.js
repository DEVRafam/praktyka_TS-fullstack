const fse = require("fs-extra");
//
module.exports = (tableName, schema, dirPath = false) => {
    return {
        up: async (queryInterface, Sequelize) => {
            // create directory for storage uploaded images
            if (dirPath) fse.ensureDirSync(dirPath);
            //
            await queryInterface.createTable(tableName, {
                id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                },
                ...schema,
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()"),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()"),
                },
            });
        },

        down: async (queryInterface) => {
            if (dirPath) fse.removeSync(dirPath);
            await queryInterface.dropTable(tableName);
        },
    };
};
