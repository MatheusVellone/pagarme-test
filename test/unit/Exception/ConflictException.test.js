'use strict';

const chai = require('chai');
const Exception = require('../../../src/Exception/Exception');
const ConflictException = require('../../../src/Exception/ConflictException');

const expect = chai.expect;

describe('ConflictException', () => {
    it('Constructor', () => {
        const name = 'random name';
        const exception = new ConflictException(name);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(ConflictException);

        expect(exception.httpCode).to.be.eql(409);
        expect(exception.body).to.be.eql({
            message: `This ${name} already exists`,
        });
    });
});
