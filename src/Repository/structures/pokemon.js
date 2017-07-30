'use strict';

const Sequelize = require('sequelize');

module.exports.fields = {
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
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
        defaultValue: 0,
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

module.exports.config = {
    timestamps: false,
};
