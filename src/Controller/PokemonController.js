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
        const pokemonNumber = req.params.id;
        return this.model.getPokemonByNumber(pokemonNumber)
            .then((pokemon) => {
                return [200, {
                    message: `Pokemon #${pokemonNumber}`,
                    result: pokemon,
                }];
            });
    }

    create(req) {
        const body = req.body;
        return this.model.createPokemon(body)
            .then(() => {
                return [201, `Pokemon ${body.name} #${body.number} created`];
            });
    }

    update(req) {

    }

    buy(req) {
        const pokemonNumber = req.params.id;
        const quantity = req.body.quantity;

        return this.model.buyPokemon(pokemonNumber, quantity)
            .then(() => {
                return [
                    200,
                    `${quantity} pokemons bought. Thanks.`,
                ];
            });
    }

    list(req) {

    }

    remove(req) {
        const pokemonNumber = req.params.id;
        return this.model.extinctPokemon(pokemonNumber)
            .then(() => {
                return [
                    200,
                    `Pokemon #${pokemonNumber} is now in extinction process and isn't available for purchasing`,
                ];
            });
    }
}

module.exports = PokemonController;
