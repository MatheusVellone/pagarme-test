'use strict';

const Joi = require('joi');
const Validator = require('./Validator');

class PokemonValidator extends Validator {
    constructor() {
        super();

        this.addValidator('create', Joi.object({
            body: Joi.object({
                number: Joi.number().integer().min(1).max(151).required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number(),
            }),
        }));

        this.addValidator('show', Joi.object({
            params: {
                pokemonNumber: Joi.number().required(),
            },
        }));

        this.addValidator('donate', Joi.object({
            params: {
                pokemonNumber: Joi.number().required(),
            },
            body: Joi.object({
                quantity: Joi.number().required(),
            }),
        }));

        this.addValidator('get', Joi.object({

        }));

        this.addValidator('list', Joi.object({
            query: {
                page: Joi.number().integer(),
            }
        }));
    }
}

module.exports = PokemonValidator;
