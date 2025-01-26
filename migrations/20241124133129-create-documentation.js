module.exports = {
	up: async (queryInterface, Sequelize) => {
		const TABLE_NAME = "documentation";
		await queryInterface.createTable(
			TABLE_NAME,
			{
				id: {
					type: Sequelize.BIGINT,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true,
				},
				title: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				content: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				url: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
				},
				language: {
					type: Sequelize.STRING,
					allowNull: false, // e.g., "en", "es", "fr"
				},
				// Mysql doesn't has support for arrays
				tags: {
					type: Sequelize.JSON,
				},
				requiredRoles: {
					type: Sequelize.JSON,
				},
			},
			{
				timestamps: false,
				tableName: TABLE_NAME,
				modelName: TABLE_NAME,
			}
		);
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable("documentation");
	},
};
