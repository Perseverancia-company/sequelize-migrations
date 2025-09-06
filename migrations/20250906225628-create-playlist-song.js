"use strict";

const TABLE_NAME = "playlist-song";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
			},
			playlistId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "playlist",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			songId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "song",
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
		await queryInterface.dropTable(TABLE_NAME);
	},
};
