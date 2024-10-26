"use strict";

// Problem when changing primary
// It's impossible to change the primary key, from a flexible type like string to UUID
// unless you can guarantee that it transitions flawlessly

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Create clientId column again
		await queryInterface.changeColumn("oauth2-client", "clientId", {
			type: Sequelize.STRING,
			// Not necessary
			// primaryKey: true,
			// unique: true,
		});
	},
	down: async (queryInterface, Sequelize) => {
		console.log(`WARNING: UUUID's will be lost here`);

		try {
			// Remove primary key constraint
			await queryInterface.changeColumn("oauth2-client", "clientId", {
				primaryKey: false,
			});
			// console.log(`Remove primary key from 'clientId' column`);

			// Rename column back to temporary name
			await queryInterface.renameColumn(
				"oauth2-client",
				"clientId",
				"new_clientId"
			);
			// console.log(`Rename column to temporary name`);
		} catch (err) {
			// console.error(err);
			// throw Error("Couldn't change column properties");

			// If that failed, the clientId column exists but it's not primary key
			// Remove it
			await queryInterface.removeColumn("oauth2-client", "clientId");
			// console.log(`Removed 'clientId' column`);
		}

		// Re-add original clientId column (without primary key)
		await queryInterface.addColumn("oauth2-client", "clientId", {
			type: Sequelize.UUID,
			unique: true,
		});
		// console.log(`Re-added 'clientId' column without primary key`);

		try {
			// Update existing rows with original UUIDs
			await queryInterface.sequelize.query(
				`UPDATE \`oauth2-client\` SET clientId = UUID()`
			);
			// console.log(`Updated existing rows with original UUIDs`);
		} catch (err) {
			console.error(err);
			throw Error("Couldn't create UUIDs for OAuth2 client'");
		}

		try {
			// Add primary key constraint to clientId
			await queryInterface.addConstraint("oauth2-client", {
				type: "PRIMARY KEY",
				fields: ["clientId"],
			});
		} catch (err) {
			console.error(err);
			throw Error("Couldn't set primary key for 'clientId' column");
		}

		try {
			// Remove temporary column
			await queryInterface.removeColumn("oauth2-client", "new_clientId");
		} catch (err) {
			console.error(err);
			// This one is alright
			// console.log("Couldn't remove temporary column");
		}
	},
};
