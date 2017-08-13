'use strict';

const Exception = require('./Exception');

class ConflictException extends Exception {
    constructor(name) {
        super(409, `This ${name} already exists`);
    }
}

module.exports = ConflictException;
