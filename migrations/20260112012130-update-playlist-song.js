"use strict";

const OLD_TABLE = "playlist-song";
const NEW_TABLE = "playlist-song-junction";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// 1. Rename the table
		await queryInterface.renameTable(OLD_TABLE, NEW_TABLE);

		// 2. Remove createdAt
		await queryInterface.removeColumn(NEW_TABLE, "createdAt");

		// 3. Remove updatedAt
		await queryInterface.removeColumn(NEW_TABLE, "updatedAt");
	},
	async down(queryInterface, Sequelize) {
		// 1. Rename back to old name
		await queryInterface.renameTable(NEW_TABLE, OLD_TABLE);

		// 2. Restore columns (in case of rollback)
		await queryInterface.addColumn(OLD_TABLE, "createdAt", {
			type: Sequelize.DATE,
			allowNull: false,
		});

		await queryInterface.addColumn(OLD_TABLE, "updatedAt", {
			type: Sequelize.DATE,
			allowNull: false,
		});
	},
};
