'use strict';

const SequelizeBaseRepository = require('./SequelizeBaseRepository');
const structure = require('./structures/pokemon');

class PokemonRepository extends SequelizeBaseRepository {
    constructor() {
        super(structure);
    }
}

module.exports = PokemonRepository;
