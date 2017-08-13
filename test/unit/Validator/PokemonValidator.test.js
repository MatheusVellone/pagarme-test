'use strict';

const chai = require('chai');
const PokemonValidator = require('../../../src/Validator/PokemonValidator');

const expect = chai.expect;

describe('PokemonValidator', () => {
    before(() => {
        this.validator = new PokemonValidator();
    });

    it('Constructor', () => {
        expect(this.validator).to.be.an.instanceof(PokemonValidator);
    });
});
