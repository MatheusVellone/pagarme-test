'use strict';

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
