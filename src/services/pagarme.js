'use strict';

const Promise = require('bluebird');
const pagarme = require('pagarme');

let instance;

class Pagarme {

    /**
     * @returns {Pagarme}
     */
    static getInstance() {
        if (!instance) {
            instance = new Pagarme();
        }
        return instance;
    }

    constructor() {
        this._connect = pagarme.client.connect({
            api_key: process.env.PAGARME_API_KEY,
        });
    }

    transaction(data) {
        return this._connect
            .then((client) => {
                return client.transactions.create({
                    amount: Math.round(data.value * 100),
                    card_holder_name: data.cardHolderName,
                    card_expiration_date: data.cardExpirationDate,
                    card_number: data.cardNumber,
                    card_cvv: data.cardCvv,
                    payment_method: data.paymentMethod || 'credit_card',
                    async: false,
                    medatada: data.metadata,
                });
            })
            .catch((err) => {
                return Promise.reject(err.response.errors);
            });
    }
}

module.exports = Pagarme;
