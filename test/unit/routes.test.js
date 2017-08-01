'use strict';

const chai = require('chai');
const routes = require('../../src/routes.json');

const expect = chai.expect;

const getActions = (routesObj) => {
    return Object.keys(routesObj)
        .reduce((allRouteHandlers, routeKey) => {
            if (typeof routesObj[routeKey] === 'object') {
                return allRouteHandlers.concat(getActions(routesObj[routeKey]));
            }
            allRouteHandlers.push(routesObj[routeKey]);
            return allRouteHandlers;
        }, []);
};


describe('Routes', () => {
    before(() => {
        this.allHandlers = getActions(routes);
        this._controllers = {};
    });

    it('All controller actions exists', () => {
        this.allHandlers.forEach((handler) => {
            const [, controller, action] = handler.match(/(.*?)\.(.*)/);
            if (!this._controllers[controller]) {
                const Controller = require(`../../src/Controller/${controller}`); // eslint-disable-line
                this._controllers[controller] = new Controller();
            }

            expect(this._controllers[controller]).to.have.a.property(action)
                .and.to.be.a('function');
        });
    });
});
