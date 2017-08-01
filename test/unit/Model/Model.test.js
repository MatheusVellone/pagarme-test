'use strict';

// const chai = require('chai');
const Model = require('../../../src/Model/Model');

// const expect = chai.expect;

describe('Model', () => {
    before(() => {
        this.model = new Model();
    });

    it('Constructor', () => {

    });
});
// class Model {
//     constructor(Repository) {
//         this._repository = new Repository();
//     }
//
//     create(...params) {
//         return this._repository.create(...params);
//     }
//
//     update(...params) {
//         return this._repository.update(...params);
//     }
//
//     findOne(...params) {
//         return this._repository.findOne(...params);
//     }
//
//     findAll(...params) {
//         return this._repository.findAll(...params);
//     }
//
//     remove(...params) {
//         return this._repository.remove(...params);
//     }
// }
//
// module.exports = Model;
