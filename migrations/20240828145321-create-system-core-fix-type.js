module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('system-core', 'usagePercentage', {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Usage percentage is required"
                }
            }
        });
        await queryInterface.changeColumn('system-core', 'freePercentage', {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Free percentage is required"
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('system-core', 'usagePercentage', {
            type: Sequelize.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Usage percentage is required"
                }
            }
        });
        await queryInterface.changeColumn('system-core', 'freePercentage', {
            type: Sequelize.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Free percentage is required"
                }
            }
        });
    }
};