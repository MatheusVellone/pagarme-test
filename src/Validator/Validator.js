'use strict';

const Joi = require('joi');
const Promise = require('bluebird');
const ValidationException = require('../Exception/ValidationException');

class Validator {
    constructor() {
        this._validators = {};
        this._predefined = {};
    }

    addPredefined(alias, rule) {
        this._predefined[alias] = rule;
    }

    getPredefined(alias, required = false) {
        const rule = this._predefined[alias];
        if (!rule) {
            return Joi.any();
        }

        return required ? rule.required() : rule;
    }

    addValidator(alias, validatorRules) {
        this._validators[alias] = validatorRules;
    }

    validate(alias, targetToValidate) {
        const schema = this._validators[alias];
        if (!schema) {
            return Promise.resolve(targetToValidate);
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
