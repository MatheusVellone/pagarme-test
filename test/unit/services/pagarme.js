'use strict';

const chai = require('chai');
const Pagarme = require('../../../src/services/pagarme');

const expect = chai.expect;

describe('Pagarme service', () => {
    it('Works as a Singleton', () => {
        const firstInstance = Pagarme.getInstance();
        const secondInstance = Pagarme.getInstance();

        expect(firstInstance).to.be.an.instanceof(Pagarme);
        expect(secondInstance).to.be.an.instanceof(Pagarme);
        expect(firstInstance).to.be.eql(secondInstance);
    });
});
