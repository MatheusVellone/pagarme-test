'use strict';

const Sequelize = require('sequelize');
const Promise = require('bluebird');
const BaseRepository = require('./BaseRepository');
const NotFoundException = require('../Exception/NotFoundException');
const ConflictException = require('../Exception/ConflictException');

// Limite de paginacao
const PAGE_LIMIT = 10;

// Configuracoes de conexao com o banco, dialeto a ser usado, logs, tudo com base
// nas variaveis de ambiente
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'true',
});

class SequelizeBaseRepository extends BaseRepository {
    constructor(structureData) {
        super();
        this.sequelize = sequelize.define(this._alias, structureData.fields, structureData.config || {});

        // Configura as chaves primarias com base na estrutura. Defaults to ['id'].
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
        })
            .then((record) => {
                if (!record) {
                    throw new NotFoundException(this._alias);
                }
                return record;
            });
    }

    findAll(page, filter, pageLimit = PAGE_LIMIT) {
        const findAllOptions = {
            where: filter,
            limit: pageLimit,
            offset: (page - 1) * pageLimit,
            raw: true,
        };

        return this.sequelize.findAndCountAll(findAllOptions)
            .then((result) => {
                // Dados de paginacao
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
            })
            .catch((err) => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    throw new ConflictException(this._alias);
                }
                return Promise.reject(err);
            });
    }

    // Node nao suporta algo como update(...keys, updateBody) para pegar
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
                };

                return this.sequelize.update(body, options);
            });
    }

    static INCREMENT(field, value = 1) {
        return sequelize.literal(`${field} ${value >= 0 ? '+' : '-'} ${Math.abs(value)}`);
    }
}

module.exports = SequelizeBaseRepository;
