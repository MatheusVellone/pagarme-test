/* eslint-disable class-methods-use-this */

'use strict';

const NotImplementedException = require('../Exception/NotImplementedException');

/**
 * Acts like an interface
 */
class BaseRepository {
    create() {
        throw new NotImplementedException(__dirname, __filename, 'create');
    }

    read() {
        throw new NotImplementedException(__dirname, __filename, 'read');
    }

    update() {
        throw new NotImplementedException(__dirname, __filename, 'update');
    }

    remove() {
        throw new NotImplementedException(__dirname, __filename, 'remove');
    }
}

module.exports = BaseRepository;
