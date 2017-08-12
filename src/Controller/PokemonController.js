'use strict';

const Controller = require('./Controller');
const PokemonValidator = require('../Validator/PokemonValidator');
const PokemonModel = require('../Model/PokemonModel');
const pluralize = require('pluralize');

class PokemonController extends Controller {
    constructor() {
        super();
        // Declara o validator e o model do controller.
        // Poderia fazer isso com base em getter/setter, mas por simplicidade ficou assim
        this.validator = new PokemonValidator();
        this.model = new PokemonModel();
    }

    show(req) {
        const pokemonNumber = req.params.number;
        return this.model.getPokemonByNumber(pokemonNumber)
            .then((pokemon) => {
                return [200, {
                    message: `${pokemon.name} (#${pokemonNumber}) data`,
                    result: pokemon,
                }];
            });
    }

    create(req) {
        const body = req.body;

        return this.model.createPokemon(body)
            .then(() => {
                return [
                    201,
                    `Pokemon ${body.name} (#${body.number}) created`,
                ];
            });
    }

    donate(req) {
        const pokemonNumber = req.params.number;
        const quantity = req.body.quantity;

        return this.model.donatePokemon(pokemonNumber, quantity)
            .then(() => {
                return [
                    200,
                    `${quantity} ${pluralize('pokemon', quantity)} donated. Thanks for your donation.`,
                ];
            });
    }

    buy(req) {
        const pokemonNumber = req.params.number;
        const paymentData = req.body;

        return this.model.buyPokemon(pokemonNumber, paymentData)
            .then(() => {
                return [
                    200,
                    `${paymentData.quantity} ${pluralize('pokemon', paymentData.quantity)} bought. Thanks.`,
                ];
            });
    }

    list(req) {
        const page = req.query.page || 1;

        return this.model.getAllPokemons(page)
            .then(([pokemons, pagination]) => {
                return [
                    200,
                    {
                        message: 'Listing pokemons',
                        result: pokemons,
                        pagination,
                    },
                ];
            });
    }

    extinct(req) {
        const pokemonNumber = req.params.number;

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
