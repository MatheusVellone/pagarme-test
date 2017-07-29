'use strict';

const Sequelize = require('sequelize');

module.exports = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    firstSeen: {
        type: Sequelize.DATE,
    },
    lastSeen: {
        type: Sequelize.DATE,
    },
    extinct: {
        type: Sequelize.BOOLEAN,
    },
};
