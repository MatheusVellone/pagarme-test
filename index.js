'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const log = require('./src/utils/log');
const appRoutes = require('./src/routes.json');

const controllers = {};
const app = express();

const registerRoutes = (routes, prefix = '/') => {
    Object.keys(routes).forEach((routeKey) => {
        if (typeof routes[routeKey] === 'object') {
            // routeKey is a route group prefix
            registerRoutes(routes[routeKey], prefix + routeKey);
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

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

registerRoutes(appRoutes);

app.all('/help', (req, res) => {
    res.status(200).send(app._router.stack);
});

app.all('*', (req, res) => {
    res.status(404).send({
        message: 'Route not found',
    });
});

app.listen(PORT, () => {
    log.console(`Listening on http://localhost:${PORT}`);
});

app.post('/buy-pokemons', (req, res) => {
    Pokemon.findOne({
        where: {
            name: req.body.name,
        },
    })
        .then((pokemon) => {
            if (pokemon.stock < req.body.quantity) {
                return res.status(400).send({
                    error: `Not enought ${pokemon.name} in stock: ${pokemon.stock}`,
                });
            }

            return request({
                uri: 'https://api.pagar.me/1/transactions',
                method: 'POST',
                json: {
                    api_key: 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg',
                    amount: pokemon.price * req.body.quantity * 100,
                    card_number: '4024007138010896',
                    card_expiration_date: '1050',
                    card_holder_name: 'Ash Ketchum',
                    card_cvv: '123',
                    metadata: {
                        product: 'pokemon',
                        name: pokemon.name,
                        quantity: req.body.quantity,
                    },
                },
            })
                .then((body) => {
                    if (body.status === 'paid') {
                        pokemon.stock -= req.body.quantity;
                        return pokemon.save()
                            .then(() => {
                                res.status(200).send(body);
                            });
                    }
                    return Promise.reject(`The payment status was ${body.status}`);
                });
        })
        .catch((err) => {
            log.console(JSON.stringify(err, null, 4));
            res.status(err.response.statusCode).send(err.response.body);
        });
});

