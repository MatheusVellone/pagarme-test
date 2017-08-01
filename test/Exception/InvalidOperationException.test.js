'use strict';

const chai = require('chai');
const Exception = require('../../src/Exception/Exception');
const InvalidOperationException = require('../../src/Exception/InvalidOperationException');

const expect = chai.expect;

describe('InvalidOperationException', () => {
    it('Constructor', () => {
        const randomMessage = 'random error message';
        const exception = new InvalidOperationException(randomMessage);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(InvalidOperationException);

        expect(exception.httpCode).to.be.eql(400);
        expect(exception.body).to.be.eql({
            message: randomMessage,
        });
    });
});
