'use strict';

const Joi = require('joi');
const Promise = require('bluebird');
const InternalException = require('../Exceptions/InternalException');

class Validator {
    constructor() {
        this._validators = {};
    }

    addValidator(alias, validatorRules) {
        this._validators[alias] = validatorRules;
    }

    validate(alias, targetToValidate) {
        const schema = this._validators[alias];
        if (!schema) {
            throw new InternalException(`Invalid validator schema ${alias} from ${this.constructor.name}`);
        }

        return new Promise((resolve, reject) => {
            Joi.validate(targetToValidate, schema, {
                stripUnknown: true,
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = Validator;
