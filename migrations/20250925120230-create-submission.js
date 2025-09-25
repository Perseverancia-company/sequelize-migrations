"use strict";

const TABLE_NAME = "submissions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable(TABLE_NAME, {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				submittedAnswer: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				isCorrect: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				submittedAt: {
					type: Sequelize.DATE,
					defaultValue: Sequelize.NOW,
					allowNull: false,
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
				exerciseId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "excercise",
						key: "id",
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
				},
			})
			.then(() => {
				// Add a unique constraint to ensure a student can only submit one final answer per exercise.
				return queryInterface.addConstraint(TABLE_NAME, {
					fields: ["userId", "exerciseId"],
					type: "unique",
					name: "unique_submission_per_user_and_excercise",
				});
			});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(TABLE_NAME);
	},
};
