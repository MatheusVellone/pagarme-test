'use strict';

const Joi = require('joi');
const Validator = require('./Validator');

class PokemonValidator extends Validator {
    constructor() {
        super();

        this.addValidator('create', Joi.object({

        }));

        this.addValidator('show', Joi.object({

        }));

        this.addValidator('update', Joi.object({

        }));

        this.addValidator('get', Joi.object({

        }));
    }
}

module.exports = PokemonValidator;
