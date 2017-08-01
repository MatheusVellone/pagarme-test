'use strict';

const chai = require('chai');
const Exception = require('../../src/Exception/Exception');
const InternalException = require('../../src/Exception/InternalException');

const expect = chai.expect;

describe('InternalException', () => {
    it('Constructor', () => {
        const exception = new InternalException();

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(InternalException);

        expect(exception.httpCode).to.be.eql(500);
        expect(exception.body).to.be.eql({
            message: 'An internal error ocurred',
        });
    });
});
