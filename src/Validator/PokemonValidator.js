'use strict';

const Joi = require('joi');
const Validator = require('./Validator');

class PokemonValidator extends Validator {
    constructor() {
        super();

        this.addValidator('create', {
            body: Joi.object({
                number: Joi.number().integer().min(1).max(151)
                    .required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number(),
            }),
        });

        this.addValidator('show', {
            params: {
                pokemonNumber: Joi.number().required(),
            },
        });

        this.addValidator('donate', {
            params: {
                pokemonNumber: Joi.number().required(),
            },
            body: Joi.object({
                quantity: Joi.number().required(),
            }),
        });

        this.addValidator('buy', {
            params: {
                pokemonNumber: Joi.number().required(),
            },
            body: {
                cardNumber: Joi.string().creditCard().required(),
                cardExpirationDate: Joi.string().length(4).required(),
                cardHolderName: Joi.string().required(),
                cardCvv: Joi.string().length(3).required(),
                quantity: Joi.number().integer().required(),
            },
        });

        this.addValidator('get', {

        });

        this.addValidator('list', {
            query: {
                page: Joi.number().integer(),
            },
        });
    }
}

module.exports = PokemonValidator;
