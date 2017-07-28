'use strict';

/**
 * @returns {Date}
 */
const date = () => {
    return new Date();
};

module.exports.dateISO = () => {
    return date().toISOString();
};

module.exports.dateTimestamp = () => {
    return date().getTime();
};

module.exports.date = () => {
    return date();
};
