'use strict';

// const chai = require('chai');
const PokemonRepository = require('../../../src/Repository/PokemonRepository');

// const expect = chai.expect;

describe('PokemonRepository', () => {
    before(() => {
        this.repository = new PokemonRepository();
    });

    it('Constructor', () => {

    });
});
// const SequelizeBaseRepository = require('./SequelizeBaseRepository.test');
// const structure = require('./structures/pokemon');
//
// class PokemonRepository extends SequelizeBaseRepository {
//     constructor() {
//         super(structure);
//     }
// }
//
// module.exports = PokemonRepository;
