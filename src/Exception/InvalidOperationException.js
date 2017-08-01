'use strict';

const Exception = require('./Exception');

class InvalidOperationException extends Exception {
    constructor(message) {
        const body = {
            message,
        };

        super(400, body);
    }
}

module.exports = InvalidOperationException;
