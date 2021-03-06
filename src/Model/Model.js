'use strict';

class Model {
    constructor(repository) {
        this._repository = repository;
    }

    create(...params) {
        return this._repository.create(...params);
    }

    update(...params) {
        return this._repository.update(...params);
    }

    findOne(...params) {
        return this._repository.findOne(...params);
    }

    findAll(...params) {
        return this._repository.findAll(...params);
    }

    remove(...params) {
        return this._repository.remove(...params);
    }
}

module.exports = Model;
