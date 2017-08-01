/* eslint-disable class-methods-use-this */

'use strict';

const NotImplementedException = require('../Exception/NotImplementedException');

/**
 * Acts like an interface
 */
class BaseRepository {
    create() {
        throw new NotImplementedException(__filename, 'create');
    }

    findOne() {
        throw new NotImplementedException(__filename, 'findOne');
    }

    findAll() {
        throw new NotImplementedException(__filename, 'findAll');
    }

    update() {
        throw new NotImplementedException(__filename, 'update');
    }

    remove() {
        throw new NotImplementedException(__filename, 'remove');
    }
}

module.exports = BaseRepository;
