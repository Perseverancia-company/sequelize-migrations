'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('contact-form', 'fromWebsite', {
			type: Sequelize.STRING(128),
			validate: {
				isUrl: {
					msg: "Please enter a valid URL.",
				}
			}
		});
		await queryInterface.addColumn('contact-form', 'fromApp', {
			type: Sequelize.STRING(128),
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('contact-form', 'fromApp');
		await queryInterface.removeColumn('contact-form', 'fromWebsite');
	}
};
