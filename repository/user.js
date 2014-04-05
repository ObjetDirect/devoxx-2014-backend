/*jshint node: true */
/*global module: true */

/**
 * User Repository
 *
 * @exports UserRepository
 * @author Julien Roche
 * @version 1.0
 * @since 1.0
 */

(function (module) {
    'use strict';

    var
        /**
         * Mongoose library
         * @type {Mongoose}
         */
        mongoose = require('mongoose');

    /**
     * @class UserRepository
     * @extends {schema}
     */
    module.exports = mongoose.model(
        'User',
        new mongoose.Schema({
            /*'id': {
                'type': mongoose.Schema.ObjectId,
                'default': function () {
                    return new mongoose.Types.ObjectId();
                }
            },*/
            'firstName': String,
            'lastName': String,
            'age': Number
        })
    );
})(module);