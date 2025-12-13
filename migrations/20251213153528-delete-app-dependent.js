"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Define the list of tables that need to be cleaned up
		const DEPENDENT_TABLES = [
			"app-output",
			"group-app-junction",
			"tag-app-junction",
			"app-config",
		];

		for (const TABLE_NAME of DEPENDENT_TABLES) {
			console.log(`--- Processing Table: ${TABLE_NAME} ---`);

			// --- 1. CRITICAL: Delete all existing data ---
			// This is the fastest way to handle the Foreign Key/Primary Key change without data migration.
			await queryInterface.bulkDelete(TABLE_NAME, null, {});
			console.log(`Data wiped from ${TABLE_NAME}.`);

			// --- 2. REMOVE OLD FK CONSTRAINT ---
			// We use a try/catch block because the constraint name might vary or might not exist
			// if the previous migration failed to create it properly.
			const CONSTRAINT_NAME = `${TABLE_NAME}_appName_fkey`;
			try {
				await queryInterface.removeConstraint(
					TABLE_NAME,
					CONSTRAINT_NAME
				);
				console.log(`Removed explicit constraint: ${CONSTRAINT_NAME}`);
			} catch (e) {
				// If the named constraint fails, try removing the associated index, which often works.
				try {
					await queryInterface.removeIndex(TABLE_NAME, ["appName"]);
					console.log(`Removed index on 'appName'.`);
				} catch (indexError) {
					console.warn(
						`Could not remove constraint or index on 'appName' for ${TABLE_NAME}. Moving on.`
					);
				}
			}

			// --- 3. REMOVE OLD COLUMN 'appName' ---
			await queryInterface.removeColumn(TABLE_NAME, "appName");
			console.log(`Removed column 'appName'.`);

			// // --- 4. REMOVE TIMESTAMPS (IF APPLICABLE) ---
			// // Since you removed timestamps from the 'app' model, doing it here cleans up the dependent tables too.
			// try {
			// 	await queryInterface.removeColumn(TABLE_NAME, "createdAt");
			// 	await queryInterface.removeColumn(TABLE_NAME, "updatedAt");
			// 	console.log(`Removed timestamps from ${TABLE_NAME}.`);
			// } catch (e) {
			// 	console.log(
			// 		`Timestamps not found or already removed in ${TABLE_NAME}.`
			// 	);
			// }
		}

		console.log(
			"--- All dependent tables successfully cleaned and modified. ---"
		);
	},

	async down(queryInterface, Sequelize) {
		// NOTE: Reverting this operation is highly complex (re-adding columns, constraints, and timestamps).
		// It is best to leave this down migration simple.

		// This is a placeholder as the up migration is highly destructive and should not be casually reverted.
		console.log(
			"WARNING: Reverting this schema transformation is complex and highly discouraged."
		);
		// A true down function would involve adding back 'appName', 'createdAt', 'updatedAt' and their constraints.
	},
};
