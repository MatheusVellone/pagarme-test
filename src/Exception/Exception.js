'use strict';

// Extends Error para ter a stack trace (vi em um video do Felipe Deschamps sobre error handling)
class Exception extends Error {
    constructor(httpCode, body) {
        super();
        this.httpCode = httpCode;

        if (typeof body === 'string') {
            body = {
                message: body,
            };
        }
        this.body = body;
    }
}

module.exports = Exception;
