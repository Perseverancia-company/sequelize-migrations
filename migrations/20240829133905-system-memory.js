'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('system-memory', 'free');
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('system-memory', 'free', {
            type: Sequelize.BIGINT,
            allowNull: false
        });
    }
};
