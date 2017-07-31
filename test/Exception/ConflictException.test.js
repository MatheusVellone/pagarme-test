'use strict';

const chai = require('chai');
const ConflictException = require('../../src/Exception/ConflictException');

const expect = chai.expect;

describe('ConflictException', () => {
    it('Constructor', () => {

    });
});
// const Exception = require('./Exception.test');
//
// class ConflictException extends Exception {
//     constructor(name) {
//         const body = {
//             message: `This ${name} already exists`,
//         };
//
//         super(409, body);
//     }
// }
//
// module.exports = ConflictException;
