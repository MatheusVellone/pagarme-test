'use strict';

const Promise = require('bluebird');
const Exception = require('../Exception/Exception');
const InternalException = require('../Exception/InternalException');
const log = require('../utils/log');

class Controller {
    appWrapper(actionName) {
        return (req, res) => {
            const validate = this.validator ? this.validator.validate(actionName, req) : Promise.resolve(req);

            validate
                .then((reqValidated) => {
                    const actionBinded = this[actionName].bind(this);

                    return actionBinded(reqValidated);
                })
                .then(([httpCode, body]) => {
                    if (typeof body === 'string') {
                        body = {
                            message: body,
                        };
                    }

                    res.status(httpCode).send(body);
                })
                .catch((err) => {
                    if (!(err instanceof Exception)) {
                        log.console(err);
                        err = new InternalException();
                    }
                    res.status(err.httpCode).send(err.body);
                });
        };
    }
}

module.exports = Controller;
