'use strict';

process.env.DB_LOGGING = false;

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../index');

module.exports = chai.request(app);
