"use strict";

const tables = [
	"property-comment",
	"property-rating",
	"property-seller-message",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		for (const table of tables) {
			// 1. Remove the column from the dependent tables
			await queryInterface.removeColumn(
				table,
				"generalPropertyInformationId"
			);
		}

		// 2. Drop the redundant table
		await queryInterface.dropTable("general-property-information");
	},
	async down(queryInterface, Sequelize) {
		// Logic to revert (Re-create table and add columns back)
		await queryInterface.createTable("general-property-information", {
			/* ... define basic ID and propertyId if you really need to revert ... */
		});

		for (const table of tables) {
			await queryInterface.addColumn(
				table,
				"generalPropertyInformationId",
				{
					type: "BIGINT", // or whatever the original type was
					allowNull: true,
				}
			);
		}
	},
};
