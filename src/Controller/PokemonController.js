'use strict';

const Controller = require('./Controller');
const PokemonValidator = require('../Validator/PokemonValidator');
const PokemonModel = require('../Model/PokemonModel');

class PokemonController extends Controller {
    constructor() {
        super();
        this.validator = new PokemonValidator();
        this.model = new PokemonModel();
    }

    show(req) {
        return this.model.extinctPokemon()
    }

    create(req) {
        return this.model.createPokemon(req.body);
    }

    update(req) {

    }

    list(req) {

    }

    remove(req) {
        return this.model.extinctPokemon(req.pokemonNumber);
    }
}

module.exports = PokemonController;
