/*jshint node: true */
/*global require: true, module: true */

/**
 * Server required configuration
 *
 * @author Julien Roche
 * @version 1.0
 * @since 1.0
 */

(function (module) {
    'use strict';

    var
        /**
         * Express instance to have some tools to produce easily our REST api
         * @type {Object}
         */
        express = require('express');

    /**
     * @class Configurator
     * @constructor
     * @param {express} app
     */
    module.exports = function (app) {
        app.enable('trust proxy');
        app.use(express.bodyParser()); // Set that we will use the Express parser (try to parse into JSON / form-url-encoded ...). See http://expressjs.com/api.html#bodyParser
        app.use(express.static(__dirname)); // Our server is the local directory '.'
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    };
})(module);