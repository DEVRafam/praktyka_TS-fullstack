module.exports = (tableName, schema) => {
    return {
        up: async (queryInterface, Sequelize) => {
            // create directory for storage uploaded images
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
            await queryInterface.dropTable(tableName);
        },
    };
};
