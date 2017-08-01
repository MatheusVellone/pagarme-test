'use strict';

// const chai = require('chai');
const PokemonModel = require('../../../src/Model/PokemonModel');

// const expect = chai.expect;

describe('PokemonModel', () => {
    before(() => {
        this.model = new PokemonModel();
    });

    it('Constructor', () => {

    });
});

// const axios = require('axios');
// const Model = require('./Model.test');
// const PokemonRepository = require('../Repository/PokemonRepository.test');
// const dateISO = require('../utils/date.test').dateISO;
//
// class PokemonModel extends Model {
//     constructor() {
//         super(PokemonRepository);
//     }
//
//     createPokemon(pokemonBody) {
//         pokemonBody.firstSeen = dateISO();
//         pokemonBody.lastSeen = dateISO();
//         return super.create(pokemonBody);
//     }
//
//     donatePokemon(pokemonNumber, stock) {
//         return super.update(pokemonNumber, {
//             stock: PokemonRepository.INCREMENT('stock', stock),
//         });
//     }
//
//     extinctPokemon(pokemonNumber) {
//         return super.update(pokemonNumber, {
//             extinct: dateISO(),
//         });
//     }
//
//     getAllPokemons(page = 1) {
//         return super.findAll(page);
//     }
//
//     _getPokemonBy(attribute, value) {
//         return super.findOne({
//             [attribute]: value,
//         });
//     }
//
//     getPokemonByNumber(number) {
//         return this._getPokemonBy('number', number);
//     }
//
//     getPokemonByName(name) {
//         return this._getPokemonBy('name', name);
//     }
//
//     buyPokemon(pokemonNumber, quantity, paymentData) {
//         return this.getPokemonByNumber(pokemonNumber)
//             .then((pokemon) => {
//                 if (pokemon.extinct) {
//                     return Promise.reject(`You can't buy this pokemon because it is in extinction process. These can be the last ${pokemon.stock} ${pokemon.name}s out there.`);
//                 }
//
//                 if (pokemon.stock < quantity) {
//                     return Promise.reject(`Not enought ${pokemon.name}s in stock. Currently have ${pokemon.stock}.`);
//                 }
//
//                 return axios({
//                     url: 'https://api.pagar.me/1/transactions',
//                     method: 'POST',
//                     headers: {
//                         'content-type': 'application/json',
//                     },
//                     data: {
//                         api_key: process.env.PAGARME_API_KEY,
//                         amount: pokemon.price * quantity * 100,
//                         card_number: paymentData.cardNumber, // '4024007138010896'
//                         card_expiration_date: paymentData.cardExpirationDate, // '1050'
//                         card_holder_name: paymentData.cardHolderName, // 'Ash Ketchum'
//                         card_cvv: paymentData.cardCvv, // '123',
//                         metadata: {
//                             product: 'pokemon',
//                             name: pokemon.name,
//                             number: pokemon.number,
//                             quantity,
//                         },
//                     },
//                 })
//                     .then((body) => {
//                         console.log(body)
//                         if (body.status === 'paid') {
//                             return super.update(pokemonNumber, {
//                                 stock: pokemon.stock - quantity,
//                             });
//                         }
//                         return Promise.reject(`The payment failed with status '${body.status}'`);
//                     });
//             });
//     }
// }
//
// module.exports = PokemonModel;
