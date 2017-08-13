'use strict';

const chai = require('chai');
const PokemonRepository = require('../../../src/Repository/PokemonRepository');

const expect = chai.expect;

describe('PokemonRepository', () => {
    before(() => {
        this.repository = new PokemonRepository();
    });

    it('Constructor', () => {
        expect(this.repository).to.be.an.instanceof(PokemonRepository);
    });
});
