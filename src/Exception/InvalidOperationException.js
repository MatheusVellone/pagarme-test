'use strict';

const Exception = require('./Exception');

class InvalidOperationException extends Exception {
    constructor(message) {
        super(400, message);
    }
}

module.exports = InvalidOperationException;
