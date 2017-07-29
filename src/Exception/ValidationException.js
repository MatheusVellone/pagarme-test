'use strict';

const Exception = require('./Exception');

class ValidationException extends Exception {
    constructor(errorsObject) {
        const errorsLength = Object.keys(errorsObject).length;
        const body = {
            message: `${errorsLength} validation errors`,
            validationErrors: errorsObject,
        };

        super(422, body);
    }
}

module.exports = ValidationException;
