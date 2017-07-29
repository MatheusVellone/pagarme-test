'use strict';

const Exception = require('../Exception/Exception');

class Controller {
    appWrapper(actionName) {
        return (req, res) => {
            const actionBinded = this[actionName].bind(this);

            const validate = this.validator ? this.validator.validate(actionName, req) : Promise.resolve(req);

            validate
                .then((reqValidated) => {
                    return actionBinded(reqValidated);
                })
                .then(([httpCode, body]) => {
                    res.status(httpCode).send(body);
                })
                .catch((err) => {
                    if (err instanceof Exception) {
                        res.status(err.httpCode).send(err.body);
                    } else {
                        res.status(500).send(err);
                    }
                });
        };
    }
}

module.exports = Controller;
