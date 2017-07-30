'use strict';

const Sequelize = require('sequelize');
const BaseRepository = require('./BaseRepository');

const PAGE_LIMIT = 10;

const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
});

class SequelizeBaseRepository extends BaseRepository {
    constructor(structureData) {
        super();
        const name = this.constructor.name.replace('Repository', '');
        this.sequelize = sequelize.define(name, structureData.fields, structureData.config || {});

        this.primaryKey = Object.keys(structureData.fields)
            .filter((field) => {
                const fieldData = structureData.fields[field];
                return fieldData.primaryKey;
            }) || ['id'];

        this.ready = this.sequelize.sync({
            force: true,
        });
    }

    findOne(condition) {
        return this.sequelize.findOne({
            raw: true,
            where: condition,
        });
    }

    findAll(page, filter, pageLimit = 1) {
        const findAllOptions = {
            where: filter,
            limit: pageLimit,
            offset: (page - 1) * pageLimit,
            raw: true,
        };

        return this.sequelize.findAndCountAll(findAllOptions)
            .then((result) => {
                const pagination = {
                    currentPage: page,
                    pages: Math.ceil((result.count / pageLimit)),
                    total: result.count,
                };
                return [
                    result.rows,
                    pagination,
                ];
            });
    }

    create(body) {
        return this.ready
            .then(() => {
                return this.sequelize.create(body);
            });
    }

    update(...params) {
        return this.ready
            .then(() => {
                const keys = params.splice(0, params.length - 1);
                const keyCondition = this.primaryKey.reduce((keyObject, field, index) => {
                    keyObject[field] = keys[index];
                    return keyObject;
                }, {});

                const body = params[0];
                const options = {
                    where: keyCondition,
                    returning: true,
                };

                return this.sequelize.update(body, options);
            });
    }

    static INCREMENT(field, value = 1) {
        return sequelize.literal(`${field} ${value >= 0 ? '+' : '-'} ${Math.abs(value)}`);
    }
}

module.exports = SequelizeBaseRepository;
