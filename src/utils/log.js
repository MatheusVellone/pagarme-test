/*
* A ideia e que este arquivo possa ter outras formas de logar, exemplo: Loggly
* */

'use strict';

module.exports.console = (...values) => {
    console.log(...values); // eslint-disable-line no-console
};
