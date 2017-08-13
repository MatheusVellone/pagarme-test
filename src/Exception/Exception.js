'use strict';

// Extends Error para ter a stack trace (vi em um video do Felipe Deschamps sobre error handling)
class Exception extends Error {
    constructor(httpCode, body) {
        super();
        this.httpCode = httpCode;

        if (typeof body === 'string') {
            // Igual ao Controller, para simplificar body que possuem apenas uma mensagem
            body = {
                message: body,
            };
        }
        this.body = body;
    }
}

module.exports = Exception;
