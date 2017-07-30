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
                id: Joi.number().required(),
            },
        }));

        this.addValidator('update', Joi.object({

        }));

        this.addValidator('get', Joi.object({

        }));
    }
}

module.exports = PokemonValidator;
