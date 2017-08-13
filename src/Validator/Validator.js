'use strict';

const Joi = require('joi');
const Promise = require('bluebird');
const ValidationException = require('../Exception/ValidationException');

class Validator {
    constructor() {
        this._validators = {};
        this._predefined = {};
    }

    /**
     * Adiciona uma nova regra predefinida
     * @param {string} alias O nome da regra predefinida
     * @param {JoiRule} rule A regra
     */
    addPredefined(alias, rule) {
        this._predefined[alias] = rule;
    }

    /**
     * Retorna a regra adicionada previamente de acordo com o alias
     * @param {string} alias O nome da regra predefinida
     * @param {boolean} [required=false] Se a regra e obrigatoria ou nao
     * @returns {*}
     */
    getPredefined(alias, required = false) {
        const rule = this._predefined[alias];
        if (!rule) {
            return Joi.any();
        }

        return required ? rule.required() : rule;
    }

    /**
     * Adiciona um validator
     * @param {string} alias O nome da regra do validator
     * @param {JoiRule} validatorRules A regra associada ao alias
     */
    addValidator(alias, validatorRules) {
        this._validators[alias] = validatorRules;
    }

    /**
     * Valida um objeto com base na regra configurada
     * @param {string} alias O nome da regra do validator a ser utilizada
     * @param {any} targetToValidate O dado que sera validado
     * @returns {any}
     */
    validate(alias, targetToValidate) {
        const schema = this._validators[alias];
        if (!schema) {
            // Se nao tiver schema configurado com o alias passado, retorna o dado original
            return Promise.resolve(targetToValidate);
        }

        const result = Joi.validate(targetToValidate, schema, {
            abortEarly: false, // Para validar todos os campos
            convert: true, // Para converter quando der. Ex: string -> number
            stripUnknown: true, // Ignora campos nao configurados
        });

        if (result.error) {
            // Caso haja erro, monta um objeto em uma estrutura mais simples
            const errorsObject = result.error.details
                .reduce((finalObject, err) => {
                    finalObject[err.context.key] = {
                        rule: err.type.replace(/\./g, '_'),
                        context: err.context,
                    };
                    return finalObject;
                }, {});

            return Promise.reject(new ValidationException(errorsObject));
        }

        // Retorna o resultado da validacao
        return Promise.resolve(result.value);
    }
}

module.exports = Validator;
