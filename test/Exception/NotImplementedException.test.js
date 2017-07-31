'use strict';

const chai = require('chai');
const NotImplementedException = require('../../src/Exception/NotImplementedException');

const expect = chai.expect;

describe('NotImplementedException', () => {
    it('Constructor', () => {

    });
});

// const InternalException = require('./InternalException.test');
//
// class NotImplementedException extends InternalException {
//     constructor(dirname, filename, action) {
//         super(500, `${dirname}/${filename}.${action} isn't implemented`);
//     }
// }
//
// module.exports = NotImplementedException;
