'use strict';

const chai = require('chai');
const Controller = require('../../src/Controller/Controller');

const expect = chai.expect;

describe('Controller', () => {
    before(() => {
        this.controller = new Controller();
    });
    it('appWrapper', (done) => {
        const functionName = 'anyFunction';
        const responseCode = 200;
        const response = {
            message: 'OK',
        };
        const req = {};
        const res = {
            status: (code) => {
                expect(code).to.be.eql(responseCode);
                return res;
            },
            send: (finalResult) => {
                expect(finalResult).to.be.eql(response);
                done();
            },
        };

        this.controller[functionName] = (handlerReq) => {
            expect(handlerReq).to.be.eql(req);
            return Promise.resolve([
                responseCode,
                response,
            ]);
        };

        const handler = this.controller.appWrapper(functionName);

        handler(req, res);
    });
});

module.exports = Controller;
