"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * The `up` method is used for making changes to the database.
		 * Here, we rename the `music` table to `song`.
		 */
		await queryInterface.renameTable("music", "song");
	},

	async down(queryInterface, Sequelize) {
		/**
		 * The `down` method is for reverting the changes made in the `up` method.
		 * Here, we rename the `song` table back to `music`.
		 */
		await queryInterface.renameTable("song", "music");
	},
};
