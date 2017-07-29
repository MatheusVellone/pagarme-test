'use strict';

class Model {
    constructor(Repository) {
        this._repository = new Repository();
    }

    create(...params) {
        return this._repository.create(...params);
    }

    update(...params) {
        return this._repository.update(...params);
    }

    read(...params) {
        return this._repository.read(...params);
    }

    remove(...params) {
        return this._repository.remove(...params);
    }
}

module.exports = Model;
