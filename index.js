'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const request = require('request-promise');
const log = require('./src/log');

const app = express();
const sequelize = new Sequelize('pokemons', null, null, {
    dialect: 'sqlite',
});

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    log.console(`Listening on http://localhost:${PORT}`);
});

const Pokemon = sequelize.define('pokemon', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
});

Pokemon.sync({
    force: true,
})
    .then(() => {
        log.console('Model is ready!');
    });

app.get('/get-pokemons', (req, res) => {
    Pokemon.findAll()
        .then((pokemons) => {
            res.send(pokemons);
        });
});

app.put('/create-pokemons', (req, res) => {
    Pokemon.create(req.body)
        .then((pokemon) => {
            res.send(pokemon);
        });
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

