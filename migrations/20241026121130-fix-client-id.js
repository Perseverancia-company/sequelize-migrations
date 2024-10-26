"use strict";

// Problem when changing primary
// It's impossible to change the primary key, from a flexible type like string to UUID
// unless you can guarantee that it transitions flawlessly

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Remove clientId column
		try {
			await queryInterface.removeColumn("oauth2-client", "clientId");
		} catch (err) {
			console.log(
				"Couldn't remove clientId column, this is likely not important, " +
					"because the column may have been removed already"
			);
			throw Error("Couldn't remove clientId column");
		}

		// Create clientId column again
		try {
			await queryInterface.addColumn("oauth2-client", "clientId", {
				type: Sequelize.STRING,
				primaryKey: true,
				unique: true,
			});
		} catch (err) {
			console.error(err);
			throw Error("Couldn't add clientId column");
		}
	},
	down: async (queryInterface, Sequelize) => {
		console.log(`Going down`);
		console.log(`WARNING: UUUID's will be lost here`);

		// // Remove clientId column
		// try {
		// 	await queryInterface.removeColumn("oauth2-client", "clientId");
		// } catch(err) {

		// }

		// try {
		// 	// Create clientId column again with original properties
		// 	await queryInterface.addColumn("oauth2-client", "clientId", {
		// 		type: Sequelize.UUID,
		// 		primaryKey: true,
		// 		unique: true,
		// 		defaultValue: Sequelize.UUIDV4,
		// 	});
		// } catch(err) {
		// 	console.error(err);
		// 	throw Error("Couldn't add column 'clientId'");
		// }

		try {
			// Remove primary key constraint
			await queryInterface.changeColumn("oauth2-client", "clientId", {
				primaryKey: false,
			});
			console.log(`Remove primary key from 'clientId' column`);

			// Rename column back to temporary name
			await queryInterface.renameColumn(
				"oauth2-client",
				"clientId",
				"new_clientId"
			);
			console.log(`Rename column to temporary name`);
		} catch (err) {
			// console.error(err);
			// throw Error("Couldn't change column properties");

			// If that failed, the clientId column exists but it's not primary key
			// Remove it
			await queryInterface.removeColumn("oauth2-client", "clientId");
			console.log(`Removed 'clientId' column`);
		}

		// Re-add original clientId column (without primary key)
		await queryInterface.addColumn("oauth2-client", "clientId", {
			type: Sequelize.UUID,
			unique: true,
			defaultValue: Sequelize.UUIDV4,
		});
		console.log(`Re-added 'clientId' column without primary key`);

		try {
			// Update existing rows with original UUIDs
			await queryInterface.sequelize.query(
				`UPDATE \`oauth2-client\` SET clientId = UUID()`
			);
			console.log(`Updated existing rows with original UUIDs`);
		} catch (err) {
			console.error(err);
			throw Error("Couldn't create UUIDs for OAuth2 client'");
		}

		// Add primary key constraint to clientId
		await queryInterface.changeColumn("oauth2-client", "clientId", {
			primaryKey: true,
		});

		// Remove temporary column
		await queryInterface.removeColumn("oauth2-client", "new_clientId");
	},
};
