'use strict';

const chai = require('chai');
const SequelizeBaseRepository = require('../../../src/Repository/SequelizeBaseRepository');

const expect = chai.expect;

const fakeStructureData = {
    fields: {},
};

describe('SequelizeBaseRepository', () => {
    before(() => {
        this.repository = new SequelizeBaseRepository(fakeStructureData);
    });

    it('Constructor', () => {
        expect(this.repository).to.be.an.instanceof(SequelizeBaseRepository);
    });

    it('Increment function', () => {
        const field = 'randomField';
        const value = Math.round(Math.random() * 1000);

        const increment = SequelizeBaseRepository.INCREMENT(field, value);
        expect(increment).to.have.property('val', `${field} + ${value}`);

        const decrement = SequelizeBaseRepository.INCREMENT(field, -value);
        expect(decrement).to.have.property('val', `${field} - ${value}`);
    });
});
