'use strict';

const chai = require('chai');
const SequelizeBaseRepository = require('../../src/Repository/SequelizeBaseRepository');

const expect = chai.expect;

const fakeStructureData = {
    fields: {},
};

describe('SequelizeBaseRepository', () => {
    before(() => {
        this.repository = new SequelizeBaseRepository(fakeStructureData);
    });

    it('Constructor', () => {

    });
});

// const Sequelize = require('sequelize');
// const Promise = require('bluebird');
// const BaseRepository = require('./BaseRepository.test');
// const NotFoundException = require('../Exception/NotFoundException.test');
// const ConflictException = require('../Exception/ConflictException.test');
//
// const PAGE_LIMIT = 10;
//
// const sequelize = new Sequelize('database', null, null, {
//     dialect: 'sqlite',
// });
//
// class SequelizeBaseRepository extends BaseRepository {
//     constructor(structureData) {
//         super();
//         this._alias = this.constructor.name.replace('Repository', '');
//         this.sequelize = sequelize.define(this._alias, structureData.fields, structureData.config || {});
//
//         this.primaryKey = Object.keys(structureData.fields)
//             .filter((field) => {
//                 const fieldData = structureData.fields[field];
//                 return fieldData.primaryKey;
//             }) || ['id'];
//
//         this.ready = this.sequelize.sync({
//             force: true,
//         });
//     }
//
//     findOne(condition) {
//         return this.sequelize.findOne({
//             raw: true,
//             where: condition,
//         })
//             .then((record) => {
//                 if (!record) {
//                     throw new NotFoundException(this._alias);
//                 }
//                 return record;
//             });
//     }
//
//     findAll(page, filter, pageLimit = PAGE_LIMIT) {
//         const findAllOptions = {
//             where: filter,
//             limit: pageLimit,
//             offset: (page - 1) * pageLimit,
//             raw: true,
//         };
//
//         return this.sequelize.findAndCountAll(findAllOptions)
//             .then((result) => {
//                 const pagination = {
//                     currentPage: page,
//                     pages: Math.ceil((result.count / pageLimit)),
//                     total: result.count,
//                 };
//                 return [
//                     result.rows,
//                     pagination,
//                 ];
//             });
//     }
//
//     create(body) {
//         return this.ready
//             .then(() => {
//                 return this.sequelize.create(body);
//             })
//             .catch((err) => {
//                 if (err.name === 'SequelizeUniqueConstraintError') {
//                     throw new ConflictException(this._alias);
//                 }
//                 return Promise.reject(err);
//             });
//     }
//
//     update(...params) {
//         return this.ready
//             .then(() => {
//                 const keys = params.splice(0, params.length - 1);
//                 const keyCondition = this.primaryKey.reduce((keyObject, field, index) => {
//                     keyObject[field] = keys[index];
//                     return keyObject;
//                 }, {});
//
//                 const body = params[0];
//                 const options = {
//                     where: keyCondition,
//                 };
//
//                 return this.sequelize.update(body, options);
//             })
//             .then(x => console.log(x) || x);
//     }
//
//     static INCREMENT(field, value = 1) {
//         return sequelize.literal(`${field} ${value >= 0 ? '+' : '-'} ${Math.abs(value)}`);
//     }
// }
//
// module.exports = SequelizeBaseRepository;
