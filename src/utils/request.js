'use strict';

const axios = require('axios');
const Promise = require('bluebird');
const InternalException = require('../Exception/InternalException');

/**
 * Normalize the error to a friendly format
 */
const normalizeError = (err) => {
    return {
        request: {
            method: err.config.method,
            headers: err.config.headers,
            data: err.config.data,
            url: err.config.url,
        },
        response: {
            statusCode: err.response.status,
            statusText: err.response.statusText,
            headers: err.response.headers,
            data: err.response.data,
        },
    };
};

const request = (method, url, data, queryString = {}, headers = {}) => {
    if (!method || !url) {
        throw new InternalException('Can\'t make a request without method and URL');
    }

    const config = {
        headers,
        method,
        url,
        data,
        timeout: 300000,
        params: queryString,
    };

    return axios(config)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return Promise.reject(normalizeError(err));
        });
};
module.exports.request = request;

module.exports.get = (url, queryString, headers) => {
    return request('get', url, undefined, queryString, headers);
};

module.exports.post = (url, data, queryString, headers) => {
    return request('post', url, data, queryString, headers);
};

module.exports.put = (url, data, queryString, headers) => {
    return request('put', url, data, queryString, headers);
};

module.exports.delete = (url, queryString, headers) => {
    return request('delete', url, undefined, queryString, headers);
};

