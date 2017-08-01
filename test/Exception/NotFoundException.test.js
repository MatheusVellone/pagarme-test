'use strict';

const chai = require('chai');
const Exception = require('../../src/Exception/Exception');
const NotFoundException = require('../../src/Exception/NotFoundException');

const expect = chai.expect;

describe('NotFoundException', () => {
    it('Constructor', () => {
        const name = 'random name';
        const exception = new NotFoundException(name);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(NotFoundException);

        expect(exception.httpCode).to.be.eql(404);
        expect(exception.body).to.be.eql({
            message: `The requested ${name} does not exists`,
        });
    });
});
