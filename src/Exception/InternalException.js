'use strict';

const Exception = require('./Exception');
const log = require('../utils/log');

class InternalException extends Exception {
    constructor(...errorDetails) {
        // Erros internos sempre possuem uma mensagem predefinida de erro
        // para evitar expor dados do backend ao usuario
        super(500, 'An internal error ocurred');
        if (errorDetails.length) {
            // E sempre logam os dados no console, para debugar
            log.console(...errorDetails);
        }
    }
}

module.exports = InternalException;
