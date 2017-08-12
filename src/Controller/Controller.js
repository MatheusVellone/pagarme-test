'use strict';

const Promise = require('bluebird');
const Exception = require('../Exception/Exception');
const InternalException = require('../Exception/InternalException');
const log = require('../utils/log');

class Controller {
    // actionName e o nome da acao que esta no arquivo de rotas
    appWrapper(actionName) {
        // Retorna uma funcao para o express
        return (req, res) => {
            // Valida a request com base no nome da acao apenas se tiver validator
            const validate = this.validator ? this.validator.validate(actionName, req) : Promise.resolve(req);

            validate
                .then((reqValidated) => {
                    // Pega a funcao da acao e binda o this.
                    const actionBinded = this[actionName].bind(this);
                    // Neste caso nao e necessario bindar, mas o codigo fica mais limpo do que:
                    // return this[actionName](reqValidated);

                    // Executa o metodo passando a request validada
                    return actionBinded(reqValidated);
                })
                .then(([httpCode, body]) => {
                    // E esperado que a acao declarada nos controllers retorne um array
                    // contendo codigo http e body da resposta. Ou uma Promise que resolva
                    // neste mesmo array

                    // Simplificar respostas que sao apenas uma string
                    if (typeof body === 'string') {
                        body = {
                            message: body,
                        };
                    }

                    // Responde a request feita ao express
                    res.status(httpCode).send(body);
                })
                .catch((err) => {
                    // Se der erro, garante que o erro seja um erro customizado
                    if (!(err instanceof Exception)) {
                        // Caso nao seja, loga o erro para debugar e gera um erro interno
                        log.console(err);
                        err = new InternalException();
                    }
                    // e responde com o codigo e o body do erro customizado
                    res.status(err.httpCode).send(err.body);
                });
        };
    }
}

module.exports = Controller;
