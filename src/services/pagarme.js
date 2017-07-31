'use strict';

const pagarme = require('pagarme');


class Pagarme {
    constructor() {
        this._connect = pagarme.client.connect({
            api_key: process.ENV.PAGARME_API_KEY,
        });
    }

    transaction(data) {
        return this._connect
            .then((client) => {
                return client.transaction.create({
                    amount: data.value * 100,
                    card_holder_name: data.cardHolderName,
                    card_expiration_date: data.cardExpirationDate,
                    card_number: data.cardNumber,
                    card_cvv: data.cardCvv,
                    payment_method: data.paymentMethod || 'credit_card',
                    async: false,
                });
            });
    }
}

module.exports = Pagarme;

