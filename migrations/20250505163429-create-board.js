"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("board", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			// Polymorphic association fields (consistent with the updated model)
			boardableId: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			boardableType: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});

		// Add foreign key for the one-to-many relationship with Column
		await queryInterface.addColumn("column", "boardId", {
			type: Sequelize.BIGINT,
			references: {
				model: "board",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},
	async down(queryInterface, Sequelize) {
		// Remove the foreign key from Column first
		await queryInterface.removeColumn("column", "boardId");

		await queryInterface.dropTable("board");
	},
};
