'use strict';

const chai = require('chai');
const Exception = require('../../../src/Exception/Exception');

const expect = chai.expect;

describe('Exception', () => {
    it('Check constructor', () => {
        const code = 200;
        const body = {
            random: 'words',
        };

        const exception = new Exception(code, body);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception.httpCode).to.be.eql(code);
        expect(exception.body).to.be.eql(body);
    });

    it('Check constructor with string body', () => {
        const code = 200;
        const body = 'some message with random information';

        const exception = new Exception(code, body);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception.httpCode).to.be.eql(code);
        expect(exception.body).to.be.an('object')
            .and.to.have.property('message', body);
    });
});
