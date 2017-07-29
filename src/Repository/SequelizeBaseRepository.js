'use strict';

const Sequelize = require('sequelize');
const BaseRepository = require('./BaseRepository');

const sequelize = new Sequelize('app', null, null, {
    dialect: 'sqlite',
});

class SequelizeBaseRepository extends BaseRepository {
    constructor(structure) {
        super();
        const name = this.constructor.name.replace('Repository', '');
        this.sequelize = sequelize.define(name, structure);

        this.ready = this.sequelize.sync({
            force: true,
        });
    }

    findOne(condition) {
        return this.sequelize.findOne({
            where: condition,
        });
    }

    findAll() {
        return this.sequelize.findAll();
    }

    create(body) {
        return this.ready
            .then(() => {
                return this.sequelize.create(body);
            });
    }

    update(body) {
        return this.ready
            .then(() => {
                return this.sequelize.update(body);
            });
    }
}

module.exports = SequelizeBaseRepository;
