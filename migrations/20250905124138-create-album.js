"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("album", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			// The album's title
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			// The year the album was released
			releaseYear: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			// Foreign key linking the album to an artist
			artistId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: "artist", // Name of the target table
					key: "id", // Name of the target column
				},
				onDelete: "CASCADE", // Deleting an artist will delete their albums
				onUpdate: "CASCADE", // Updating an artist's id will cascade to the albums
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
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("album");
	},
};
