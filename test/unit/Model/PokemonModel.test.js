'use strict';

const chai = require('chai');
const PokemonModel = require('../../../src/Model/PokemonModel');

const expect = chai.expect;

describe('PokemonModel', () => {
    before(() => {
        this.model = new PokemonModel();
    });

    it('Constructor', () => {
        expect(this.model).to.be.an.instanceof(PokemonModel);
    });
});
