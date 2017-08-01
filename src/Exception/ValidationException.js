'use strict';

const Exception = require('./Exception');
const pluralize = require('pluralize');

class ValidationException extends Exception {
    constructor(errorsObject) {
        const errorsLength = Object.keys(errorsObject).length;
        const body = {
            message: `${errorsLength} validation ${pluralize('error', errorsLength)}`,
            validationErrors: errorsObject,
        };

        super(422, body);
    }
}

module.exports = ValidationException;
