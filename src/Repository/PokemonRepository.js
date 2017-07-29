'use strict';

const SequelizeBaseRepository = require('./SequelizeBaseRepository');
const structure = require('./structures/pokemon');
const dateISO = require('../utils/date').dateISO;

class PokemonRepository extends SequelizeBaseRepository {
    constructor() {
        super(structure);
    }

    create(pokemon) {
        pokemon.firstSeen = dateISO();
        return super.create(pokemon);
    }

    update(pokemon) {
        pokemon.lastSeen = dateISO();
        return super.update(pokemon);
    }
}

module.exports = PokemonRepository;
