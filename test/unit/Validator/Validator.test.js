'use strict';

const chai = require('chai');
const Joi = require('joi');
const Validator = require('../../../src/Validator/Validator');

const expect = chai.expect;

describe('Validator', () => {
    before(() => {
        this.validator = new Validator();
    });

    it('Check constructor', () => {
        expect(this.validator).to.have.property('_validators')
            .and.to.be.an('object')
            .and.to.be.eql({});
        expect(this.validator).to.have.property('_predefined')
            .and.to.be.an('object')
            .and.to.be.eql({});
    });

    it('addValidator', () => {
        const alias = 'field1';
        const rules = Joi.string();

        this.validator.addValidator(alias, rules);

        expect(this.validator._validators[alias]).to.be.eql(rules);
    });
});
