'use strict';

// const chai = require('chai');
const BaseRepository = require('../../src/Repository/BaseRepository');

// const expect = chai.expect;

describe('BaseRepository', () => {
    before(() => {
        this.repository = new BaseRepository();
    });

    it('Constructor', () => {

    });
});

// const NotImplementedException = require('../Exception/NotImplementedException.test');
//
// /**
//  * Acts like an interface
//  */
// class BaseRepository {
//     create() {
//         throw new NotImplementedException(__dirname, __filename, 'create');
//     }
//
//     findOne() {
//         throw new NotImplementedException(__dirname, __filename, 'findOne');
//     }
//
//     findAll() {
//         throw new NotImplementedException(__dirname, __filename, 'findAll');
//     }
//
//     update() {
//         throw new NotImplementedException(__dirname, __filename, 'update');
//     }
//
//     remove() {
//         throw new NotImplementedException(__dirname, __filename, 'remove');
//     }
// }
//
// module.exports = BaseRepository;
