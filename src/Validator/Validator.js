'use strict';

const Joi = require('joi');
const Promise = require('bluebird');
const InternalException = require('../Exceptions/InternalException');
const ValidationException = require('../Exceptions/ValidationException');

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

        const result = Joi.validate(targetToValidate, schema, {
            abortEarly: false,
            convert: true,
            stripUnknown: true,
        });

        if (result.error) {
            const errorsObject = result.error.details
                .reduce((finalObject, err) => {
                    finalObject[err.context.key] = {
                        rule: err.type.replace(/\./g, '_'),
                        context: err.context,
                    };
                    return finalObject;
                }, {});

            return Promise.reject(new ValidationException(errorsObject));
        }

        return Promise.resolve(result.value);
    }
}

module.exports = Validator;
