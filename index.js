/*jshint node: true */
/*global require: true */

/**
 * We declare here our nodeJs server, that will produce the REST api
 *
 * @author Julien Roche
 * @version 1.0
 * @since 1.0
 */

'use strict';

console.log('Start to initialize our server');

// First, load required modules
var
    /**
     * Express instance to have some tools to produce easily our REST api
     * @type {Object}
     */
    express = require('express'),

    /**
     * Mongoose library
     * @type {Mongoose}
     */
    mongoose = require('mongoose'),

    /**
     * Express application instance
     * @type {express}
     */
    app = express(),

    /**
     * User REST api
     * @type {exports}
     */
    userRestApi = require('./rest/user'),

    /**
     * Server configuration
     * @type {exports}
     */
    configurator = require('./config'),

    /**
     * Server port
     * @type {number}
     */
    port = process.env.PORT || 9000;

// ---------------------------------------------------------------------------------------------------------------------
// Add some mime-types
console.log('Define some mime types');
express.static.mime.define(
    {
        'text/cache-manifest': ['appcache'],
        'text/html': ['tmpl'],
        'text/less': ['less'],
        'image/svg+xml': ['svg'],
        'font/opentype': ['otf'],
        'application/vnd.ms-fontobject': ['eot'],
        'application/octet-stream': ['ttf'],
        'application/font-woff': ['woff']
    }
);

// ---------------------------------------------------------------------------------------------------------------------
// MongoDB connection
console.log('Connection to mongoDB');

mongoose.connect('mongodb://localhost/devoxx-2014');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback() {
    // -----------------------------------------------------------------------------------------------------------------
    // Classical configuration
    console.log('Initialization of the server (with right configurations and middlewares)');
    app.configure(function () {
        configurator(app);
    });

    // -----------------------------------------------------------------------------------------------------------------
    // REST api definition
    console.log('Start to initialize our REST api');
    userRestApi(app);

    // ------------------------------------------------------------------------------------------------------------------
    // And finally, run the server
    app.listen(port);

    console.log('Server started on port ' + port);
});