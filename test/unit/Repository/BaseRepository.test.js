'use strict';

const chai = require('chai');
const BaseRepository = require('../../../src/Repository/BaseRepository');
const NotImplementedException = require('../../../src/Exception/NotImplementedException');

const expect = chai.expect;

describe('BaseRepository', () => {
    before(() => {
        this.repository = new BaseRepository();
    });

    it('Constructor', () => {
        expect(this.repository).to.be.an.instanceof(BaseRepository);
    });

    it('Expect abstract methods', () => {
        const methods = [
            'create',
            'findOne',
            'findAll',
            'update',
            'remove',
        ];

        methods.forEach((method) => {
            expect(this.repository[method]).to.throw(NotImplementedException);
        });
    });
});
