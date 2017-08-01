'use strict';

const chai = require('chai');
const PokemonController = require('../../src/Controller/PokemonController');
const PokemonValidator = require('../../src/Validator/PokemonValidator');
const PokemonModel = require('../../src/Model/PokemonModel');

const expect = chai.expect;

describe('PokemonController', () => {
    before(() => {
        this.controller = new PokemonController();
    });

    it('Constructor', () => {
        expect(this.controller.validator).to.be.an.instanceof(PokemonValidator);
        expect(this.controller.model).to.be.an.instanceof(PokemonModel);
    });
});
