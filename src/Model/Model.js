'use strict';

const Promise = require('bluebird');
const NotFoundException = require('../Exception/NotFoundException');
const ConflictException = require('../Exception/ConflictException');

class Model {
    constructor(Repository) {
        this._repository = new Repository();
        this._alias = this.constructor.name.replace('Model', '');
    }

    create(...params) {
        return this._repository.create(...params)
            .catch((err) => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    throw new ConflictException(this._alias);
                }
                return Promise.reject(err);
            });
    }

    update(...params) {
        return this._repository.update(...params);
    }

    findOne(...params) {
        return this._repository.findOne(...params)
            .then((record) => {
                if (!record) {
                    throw new NotFoundException(this._alias);
                }
                return record;
            });
    }

    findAll(...params) {
        return this._repository.findAll(...params);
    }

    remove(...params) {
        return this._repository.remove(...params);
    }
}

module.exports = Model;
