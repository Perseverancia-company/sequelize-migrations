"use strict";

const TABLE_NAME = "app-config";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(TABLE_NAME, {
			appName: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
				validate: {
					notEmpty: {
						msg: "Application name is required",
					},
				},
				references: {
					model: "app",
					key: "name",
				},
			},
			configKey: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
				validate: {
					notEmpty: {
						msg: "Configuration key is required",
					},
				},
			},
			configValue: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Type is required",
					},
				},
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			updatedBy: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Updated by is required",
					},
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
