'use strict';

const chai = require('chai');
const log = require('../../../src/utils/log');

const expect = chai.expect;

describe('Log', () => {
    it('Check for log types', () => {
        expect(log).to.be.an('object')
            .and.to.have.property('console');
        expect(Object.keys(log).length).to.be.eql(1);
    });
});
