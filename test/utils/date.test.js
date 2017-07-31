'use strict';

const chai = require('chai');
const dateUtils = require('../../src/utils/date');

const expect = chai.expect;

describe('Date Utils', () => {
    it('dateISO', () => {
        const dateISO = dateUtils.dateISO();
        expect(dateISO).to.be.an('string');
    });

    it('dateTimestamp', () => {
        const dateISO = dateUtils.dateTimestamp();
        expect(dateISO).to.be.a('number');
    });

    it('date', () => {
        const date = dateUtils.date();
        expect(date).to.be.an.instanceof(Date);
    });
});
