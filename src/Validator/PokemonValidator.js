'use strict';

const Joi = require('joi');
const Validator = require('./Validator');

class PokemonValidator extends Validator {
    constructor() {
        super();

        // Adiciona uma nova regra predefinida chamada PokemonNumber
        this.addPredefined('PokemonNumber', Joi.number().integer().min(1).max(151));

        // Cria os validadores com o alias sendo o nome da action da rota
        this.addValidator('create', {
            body: Joi.object({
                number: this.getPredefined('PokemonNumber', true),
                name: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number(),
            }),
        });

        this.addValidator('show', {
            params: {
                number: this.getPredefined('PokemonNumber', true),
            },
        });

        this.addValidator('extinct', {
            params: {
                number: this.getPredefined('PokemonNumber', true),
            },
        });

        this.addValidator('donate', {
            params: {
                number: Joi.number().required(),
            },
            body: Joi.object({
                quantity: Joi.number().required(),
            }),
        });

        this.addValidator('buy', {
            params: {
                number: Joi.number().required(),
            },
            body: {
                cardNumber: Joi.string().creditCard().required(),
                cardExpirationDate: Joi.string().length(4).required(),
                cardHolderName: Joi.string().required(),
                cardCvv: Joi.string().length(3).required(),
                quantity: Joi.number().integer().required(),
            },
        });

        this.addValidator('list', {
            query: {
                page: Joi.number().integer(),
            },
        });
    }
}

module.exports = PokemonValidator;
