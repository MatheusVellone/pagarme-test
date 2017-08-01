'use strict';

const InternalException = require('./InternalException');

class NotImplementedException extends InternalException {
    constructor(dirname, filename, action) {
        super(`${dirname}/${filename}.${action} isn't implemented`);
    }
}

module.exports = NotImplementedException;
