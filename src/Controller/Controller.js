'use strict';

const Exception = require('../Exception/Exception');

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
                    if (err instanceof Exception) {
                        res.status(err.httpCode).send(err.body);
                    } else {
                        // TODO - nao expor stack qndo der erro
                        res.status(500).send({
                            message: `An unexpected error occurred: ${err.message}`,
                            stack: err.stack,
                        });
                    }
                });
        };
    }
}

module.exports = Controller;
