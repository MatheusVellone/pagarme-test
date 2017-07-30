'use strict';

const Exception = require('./Exception');

class ConflictException extends Exception {
    constructor(name) {
        const body = {
            message: `This ${name} already exists`,
        };

        super(409, body);
    }
}

module.exports = ConflictException;
