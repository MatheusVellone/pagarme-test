'use strict';

const Model = require('./Model');
const PokemonRepository = require('../Repository/PokemonRepository');
const dateISO = require('../utils/date').dateISO;
const postRequest = require('../utils/request').post;

class PokemonModel extends Model {
    constructor() {
        super(new PokemonRepository());
    }

    createPokemon(pokemonBody) {
        pokemonBody.firstSeen = dateISO();
        pokemonBody.lastSeen = dateISO();
        return super.create(pokemonBody);
    }

    donatePokemon(pokemonNumber, stock) {
        return super.update(pokemonNumber, {
            stock: PokemonRepository.INCREMENT('stock', stock),
        });
    }

    extinctPokemon(pokemonNumber) {
        return super.update(pokemonNumber, {
            extinct: dateISO(),
        });
    }

    getAllPokemons(page = 1) {
        return super.findAll(page);
    }

    _getPokemonBy(attribute, value) {
        return super.findOne({
            [attribute]: value,
        });
    }

    getPokemonByNumber(number) {
        return this._getPokemonBy('number', number);
    }

    getPokemonByName(name) {
        return this._getPokemonBy('name', name);
    }

    buyPokemon(pokemonNumber, paymentBody) {
        return this.getPokemonByNumber(pokemonNumber)
            .then((pokemon) => {
                if (pokemon.extinct) {
                    return Promise.reject(`You can't buy this pokemon because it is in extinction process. These can be the last ${pokemon.stock} ${pokemon.name}s out there.`);
                }

                if (pokemon.stock < paymentBody.quantity) {
                    return Promise.reject(`Not enought ${pokemon.name}s in stock. Currently have ${pokemon.stock}.`);
                }

                const data = {
                    api_key: process.env.PAGARME_API_KEY,
                    amount: pokemon.price * paymentBody.quantity * 100,
                    card_number: paymentBody.cardNumber, // '4024007138010896'
                    card_expiration_date: paymentBody.cardExpirationDate, // '1050'
                    card_holder_name: paymentBody.cardHolderName, // 'Ash Ketchum'
                    card_cvv: paymentBody.cardCvv, // '123',
                    metadata: {
                        product: 'pokemon',
                        name: pokemon.name,
                        number: pokemon.number,
                        quantity: paymentBody.quantity,
                    },
                };

                const headers = {
                    'content-type': 'application/json',
                };

                // TODO - use pagarme SDK
                // https://pagarme.github.io/pagarme-js/
                return postRequest('https://api.pagar.me/1/transactions', data, undefined, headers)
                    .then((body) => {
                        // console.log(body);
                        if (body.status === 'paid') {
                            return super.update(pokemonNumber, {
                                stock: pokemon.stock - paymentBody.quantity,
                            });
                        }
                        return Promise.reject(`The payment failed with status '${body.status}'`);
                    });
            });
    }
}

module.exports = PokemonModel;
