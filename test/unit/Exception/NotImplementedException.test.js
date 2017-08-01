'use strict';

const chai = require('chai');
const Exception = require('../../../src/Exception/Exception');
const InternalException = require('../../../src/Exception/InternalException');
const NotImplementedException = require('../../../src/Exception/NotImplementedException');

const expect = chai.expect;

describe('NotImplementedException', () => {
    it('Constructor', () => {
        const name = 'random name';
        const exception = new NotImplementedException(__dirname, __filename, name);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(InternalException);
        expect(exception).to.be.an.instanceof(NotImplementedException);

        expect(exception.httpCode).to.be.eql(500);
        expect(exception.body).to.be.eql({
            message: 'An internal error ocurred',
        });
    });
});
