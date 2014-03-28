/*jshint node: true */
/*global module: true */

/**
 * Users REST api
 *
 * @author Julien Roche
 * @version 1.0
 * @since 1.0
 */

(function (module) {
    'use strict';

    // First, load required modules
    var
        /**
         * Prefix for our REST api
         * @type {string}
         */
        restPrefix = '/api',

        /**
         * List of users (simulate a database)
         * @type {Array<{ id: number, firstName: string, lastName: string, age: number }>}
         */
        users = [ { 'id': 1, 'firstName': 'John', 'lastName': 'Doe', 'age': 25 } ];


    /**
     * @class UsersRestApi
     * @constructor
     * @param {express} app
     */
    module.exports = function (app) {
        console.log('Initialization of the User REST api');

        /**
         * Get a user
         */
        app.get(restPrefix + '/users/:id', function(req, res) {
            console.log('A request is done on /users/:id on GET with id - ' + req.params.id);
            var id = parseInt(req.params.id, 10),
                user = users.filter(function (user) {
                    return user.id === id;
                });

            console.log('user:' + JSON.stringify(user));

            if (user === null || user === undefined || user.length < 1) {
                res.send(404);

            } else {
                res.json(user[0]);
            }
        });

        /**
         * Get all users
         */
        app.get(restPrefix + '/users', function(req, res) {
            console.log('A request is done on /users on GET');
            res.json(users);
        });

        /**
         * Update a user
         */
        app.put(restPrefix + '/users/:id', function(req, res) {
            console.log('A request is done on /users on PUT with id - ' + req.params.id);

            if(!req.body) {
                res.send(400);
                return;
            }

            var id = parseInt(req.params.id, 10),
                userIndex = null;

            users.every(function (user, index) {
                if (user.id === id) {
                    userIndex = index;
                    return false; // break like
                }

                return true;
            });

            if (userIndex === null) {
                res.send(404);

            } else {
                users[userIndex] = req.body;
                res.json(req.body);
            }
        });

        /**
         * Create a user
         */
        app.post(restPrefix + '/users', function(req, res) {
            console.log('A request is done on /users on POST');

            if(!req.body) {
                res.send(400);
                return;
            }

            var user = req.body;
            user.id = Date.now();

            users.push(user);
            res.json(user);
        });

        /**
         * Remove a user
         */
        app['delete'](restPrefix + '/users/:id', function(req, res) {
            console.log('A request is done on /user on DELETE with id - ' + req.params.id);

            var id = parseInt(req.params.id, 10),
                userIndex = null;

            users.every(function (user, index) {
                if (user.id === id) {
                    userIndex = index;
                    return false; // break like
                }

                return true;
            });

            if (userIndex === null) {
                res.send(404);

            } else {
                users.splice(userIndex, 1);
                res.json(200);
            }
        });

        console.log('End of initialization of the User REST api');
    };
})(module);