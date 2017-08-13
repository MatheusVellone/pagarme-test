'use strict';

const chai = require('chai');
const Model = require('../../../src/Model/Model');

const expect = chai.expect;

describe('Model', () => {
    before(() => {
        this.model = new Model();
    });

    it('Constructor', () => {
        expect(this.model).to.be.an.instanceof(Model);
    });
});
