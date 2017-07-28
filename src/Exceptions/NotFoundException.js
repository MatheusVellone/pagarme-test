'use strict';

const Exception = require('./Exception');

class NotFoundException extends Exception {
    constructor(label) {
        super(404, `The requested ${label} does not exists`);
    }
}

module.exports = NotFoundException;
