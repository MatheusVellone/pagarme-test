'use strict';

// A aquisicao dos dados do pokemon da PokeApi poderia ser feito em paralelo a acao de persistir no sequelize
// para obter melhor desempenho

const Pokedex = require('pokedex-promise-v2');
const axios = require('axios');
const Model = require('./Model');
const PokemonRepository = require('../Repository/PokemonRepository');
const dateISO = require('../utils/date').dateISO;

class PokemonModel extends Model {
    constructor() {
        super(PokemonRepository);
        this.pokedex = new Pokedex();
    }

    mergeWithExternalPokemonData(pokemon) {
        return this.pokedex.getPokemonByName(pokemon.number)
            .then((pokedexData) => {
                pokemon.additionalData = pokedexData;
                return pokemon;
            });
    }

    createPokemon(pokemonBody) {
        pokemonBody.firstSeen = dateISO();
        return super.create(pokemonBody);
    }

    donatePokemon(pokemonNumber, stock) {
        return super.update(pokemonNumber, {
            stock: PokemonRepository.INCREMENT('stock', stock),
        });
    }

    extinctPokemon(pokemonBody) {
        pokemonBody.extinct = dateISO();
        return super.update(pokemonBody);
    }

    getAllPokemons(page = 1) {
        return super.findAll(page);
    }

    getPokemonBy(attribute, value) {
        return super.findOne({
            [attribute]: value,
        })
            .then((pokemon) => {
                return pokemon && this.mergeWithExternalPokemonData(pokemon);
            });
    }

    getPokemonByNumber(number) {
        return this.getPokemonBy('number', number);
    }

    getPokemonByName(name) {
        return this.getPokemonBy('name', name);
    }

    buyPokemon(pokemonNumber, quantity) {
        return this.getPokemonByNumber(pokemonNumber)
            .then((pokemon) => {
                if (pokemon.extinct) {
                    return [
                        400,
                        `You can't buy this pokemon because it is in extinction process. These can be the last ${pokemon.stock} ${pokemon.name}s out there.`,
                    ];
                }

                if (pokemon.stock < quantity) {
                    return [
                        400,
                        `Not enought ${pokemon.name}s in stock. Currently have ${pokemon.stock}.`,
                    ];
                }

                // TODO - remover 'mock'
                return (Promise.reject({ response: {} }) || axios({
                    url: 'https://api.pagar.me/1/transactions',
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: {
                        api_key: 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg',
                        amount: pokemon.price * quantity * 100,
                        card_number: '4024007138010896',
                        card_expiration_date: '1050',
                        card_holder_name: 'Ash Ketchum',
                        card_cvv: '123',
                        metadata: {
                            product: 'pokemon',
                            name: pokemon.name,
                            number: pokemon.number,
                            quantity,
                        },
                    },
                }))
                    .catch((err) => {
                        console.log(err.response.data);
                        // TODO - retirar isso
                        return {
                            status: 'paid',
                        };
                    })
                    .then((body) => {
                        if (body.status === 'paid') {
                            return super.update(pokemonNumber, {
                                stock: pokemon.stock - quantity,
                            });
                        }
                        return Promise.reject(`The payment status was ${body.status}`);
                    });
            });
    }
}

module.exports = PokemonModel;
