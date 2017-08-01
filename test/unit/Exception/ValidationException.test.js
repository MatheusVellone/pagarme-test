'use strict';

const chai = require('chai');
const Exception = require('../../../src/Exception/Exception');
const ValidationException = require('../../../src/Exception/ValidationException');

const expect = chai.expect;

describe('ValidationException', () => {
    it('Constructor singular', () => {
        const errors = {
            some: {
                error: 'structure',
            },
        };
        const exception = new ValidationException(errors);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(ValidationException);

        expect(exception.httpCode).to.be.eql(422);
        expect(exception.body).to.be.eql({
            message: '1 validation error',
            validationErrors: errors,
        });
    });

    it('Constructor plural', () => {
        const errors = {
            some: {
                error: 'structure',
            },
            anotherError: {
                error: 'structure',
            },
        };
        const exception = new ValidationException(errors);

        expect(exception).to.be.an.instanceof(Error);
        expect(exception).to.be.an.instanceof(Exception);
        expect(exception).to.be.an.instanceof(ValidationException);

        expect(exception.httpCode).to.be.eql(422);
        expect(exception.body).to.be.eql({
            message: '2 validation errors',
            validationErrors: errors,
        });
    });
});
