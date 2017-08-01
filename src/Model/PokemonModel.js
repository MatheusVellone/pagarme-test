'use strict';

const pluralize = require('pluralize');
const Model = require('./Model');
const PokemonRepository = require('../Repository/PokemonRepository');
const dateISO = require('../utils/date').dateISO;
const Pagarme = require('../services/pagarme');
const InvalidOperationException = require('../Exception/InvalidOperationException');

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
                    throw new InvalidOperationException(`You can't buy this pokemon because it is in extinction process. These can be the last ${pokemon.stock} ${pokemon.name}s out there.`);
                }

                if (pokemon.stock < paymentBody.quantity) {
                    throw new InvalidOperationException(`Not enought ${pluralize(pokemon.name, paymentBody.quantity)} in stock. Currently have ${pokemon.stock}.`);
                }

                const transactionData = {
                    value: pokemon.price * paymentBody.quantity,
                    cardNumber: paymentBody.cardNumber,
                    cardExpirationDate: paymentBody.cardExpirationDate,
                    cardHolderName: paymentBody.cardHolderName,
                    cardCvv: paymentBody.cardCvv,
                    metadata: {
                        product: 'pokemon',
                        name: pokemon.name,
                        number: pokemon.number,
                        quantity: paymentBody.quantity,
                    },
                };

                const pagarmeClient = Pagarme.getInstance();
                return pagarmeClient.transaction(transactionData)
                    .then((body) => {
                        if (body.status === 'paid') {
                            return super.update(pokemonNumber, {
                                stock: pokemon.stock - paymentBody.quantity,
                            });
                        }
                        throw new InvalidOperationException(`The payment failed with status '${body.status}'`);
                    });
            });
    }
}

module.exports = PokemonModel;
