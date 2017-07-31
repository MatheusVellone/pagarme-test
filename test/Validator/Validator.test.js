'use strict';

const chai = require('chai');
const Validator = require('../../src/Validator/Validator');

const expect = chai.expect;

describe('Validator', () => {
    before(() => {
        this.validator = new Validator();
    });

    it('Check constructor', () => {
        expect(this.validator).to.have.property('_validators')
            .and.to.be.an('object')
            .and.to.be.eql({});
    });

    it('addValidator', () => {
        const alias = 'alias';
        const rules = {
            field1: 'some joi instance',
            field2: 'another joi data',
        };

        this.validator.addValidator(alias, rules);

        // expect(this.validator._validators[alias]).to.be
    });
});
// const Joi = require('joi');
// const Promise = require('bluebird');
// const InternalException = require('../Exception/InternalException.test');
// const ValidationException = require('../Exception/ValidationException.test');
//
// class Validator {
//     constructor() {
//         this._validators = {};
//     }
//
//     addValidator(alias, validatorRules) {
//         this._validators[alias] = Joi.object(validatorRules);
//     }
//
//     validate(alias, targetToValidate) {
//         const schema = this._validators[alias];
//         if (!schema) {
//             return Promise.resolve(targetToValidate);
//         }
//
//         const result = Joi.validate(targetToValidate, schema, {
//             abortEarly: false,
//             convert: true,
//             stripUnknown: true,
//         });
//
//         if (result.error) {
//             const errorsObject = result.error.details
//                 .reduce((finalObject, err) => {
//                     finalObject[err.context.key] = {
//                         rule: err.type.replace(/\./g, '_'),
//                         context: err.context,
//                     };
//                     return finalObject;
//                 }, {});
//
//             return Promise.reject(new ValidationException(errorsObject));
//         }
//
//         return Promise.resolve(result.value);
//     }
// }
//
// module.exports = Validator;
