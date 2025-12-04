"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const TABLE_NAME = "package";

        // --- 2. Create the new table with 'id' as the PK ---
        await queryInterface.createTable(TABLE_NAME, {
            // New Primary Key: id (auto-incrementing integer)
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            // The name field is now a UNIQUE index
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            version: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            isPrivate: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            lastUpdated: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
                allowNull: false,
            },
            // Since timestamps: false is set in the model, we omit createdAt/updatedAt
        });

        console.log(`Table '${TABLE_NAME}' has been successfully recreated with 'id' as the primary key.`);
    },

    async down(queryInterface, Sequelize) {
        const TABLE_NAME = "package";
        
        // Reverting this migration means dropping the table again.
        await queryInterface.dropTable(TABLE_NAME);

        console.warn(`Table '${TABLE_NAME}' has been dropped in the 'down' migration.`);
        // Note: Reverting to the old schema (name as PK) is omitted as it's complex and undesirable.
    },
};