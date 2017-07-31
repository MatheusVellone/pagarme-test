'use strict';

// const chai = require('chai');
const PokemonValidator = require('../../src/Validator/PokemonValidator');

// const expect = chai.expect;

describe('PokemonValidator', () => {
    before(() => {
        this.validator = new PokemonValidator();
    });

    it('Constructor', () => {

    });
});
// const Joi = require('joi');
// const Validator = require('./Validator.test');
//
// class PokemonValidator extends Validator {
//     constructor() {
//         super();
//
//         this.addValidator('create', {
//             body: Joi.object({
//                 number: Joi.number().integer().min(1).max(151)
//                     .required(),
//                 name: Joi.string().required(),
//                 price: Joi.number().required(),
//                 stock: Joi.number(),
//             }),
//         });
//
//         this.addValidator('show', {
//             params: {
//                 pokemonNumber: Joi.number().required(),
//             },
//         });
//
//         this.addValidator('donate', {
//             params: {
//                 pokemonNumber: Joi.number().required(),
//             },
//             body: Joi.object({
//                 quantity: Joi.number().required(),
//             }),
//         });
//
//         this.addValidator('buy', {
//             path: {
//
//             },
//             body: {
//                 cardNumber: Joi.string().required(),
//                 cardExpirationDate: Joi.string().required(),
//                 cardHolderName: Joi.string().required(),
//                 cardCvv: Joi.string().required(),
//                 quantity: Joi.number().integer().required(),
//             },
//         });
//
//         this.addValidator('get', {
//
//         });
//
//         this.addValidator('list', {
//             query: {
//                 page: Joi.number().integer(),
//             },
//         });
//     }
// }
//
// module.exports = PokemonValidator;
