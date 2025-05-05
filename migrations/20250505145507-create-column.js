"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("column", {
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
			order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		});

		// Add foreign key to the Task table
		await queryInterface.addColumn("task", "columnId", {
			type: Sequelize.BIGINT,
			references: {
				model: "column",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},
	async down(queryInterface, Sequelize) {
		// Remove foreign key from Task table first
		await queryInterface.removeColumn("task", "columnId");

		await queryInterface.dropTable("column");
	},
};
