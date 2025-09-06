"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("playlist", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "user",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("playlist");
	},
};
