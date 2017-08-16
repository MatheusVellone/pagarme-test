/*
* Inicia o servidor express
* Abre o arquivo de rotas `src/routes.json` e configura o express com base nele.
* Explicar como funciona o arquivo de rotas
* Todas as rotas sao 'envelopadas' pelo metodo `appWrapper` contido no Controller pai.
*   Evitar rotas com acao = appWrapper
* */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const log = require('./src/utils/log');
const appRoutes = require('./src/routes.json');

require('dotenv').config();

const controllers = {};
const app = express();
// Porta do express carregada via variavel de ambiente. Default = 3000
const PORT = process.env.PORT || 3000;

const registerRoutes = (routes, prefix = '') => {
    Object.keys(routes).forEach((routeKey) => {
        if (typeof routes[routeKey] === 'object') {
            // routeKey is a route group prefix
            registerRoutes(routes[routeKey], `${prefix}/${routeKey}`);
        } else {
            // routeKey is the VERB and path
            const handler = routes[routeKey];
            const [, method, route] = routeKey.match(/(.*?)\s(.*)/);

            const [, controllerName, actionName] = handler.match(/(.*?)\.(.*)/);
            const methodLowerCase = method.toLowerCase();

            if (!controllers[controllerName]) {
                const Controller = require(`./src/Controller/${controllerName}`); // eslint-disable-line
                controllers[controllerName] = new Controller();
            }

            app[methodLowerCase](prefix + route, controllers[controllerName].appWrapper(actionName));
        }
    });
};

app.use(bodyParser.json());

registerRoutes(appRoutes);

// Rota de ajuda que lista todas as rotas
app.all('/help', (req, res) => {
    res.status(200).send(app._router.stack);
});

// Qualquer outra rota responde com erro 404
// O express ja faz isso por padrao, mas a ideia e poder customizar a resposta
app.all('*', (req, res) => {
    res.status(404).send({
        message: 'Route not found',
    });
});

app.listen(PORT, () => {
    log.console(`Listening on http://localhost:${PORT}`);
});

module.exports = app;
