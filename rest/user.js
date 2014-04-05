/*jshint node: true */
/*global module: true */

/**
 * Users REST api
 *
 * @exports UsersRestApi
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
         * User schema
         * @type {UserRepository}
         */
        User = require('../repository/user');


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

            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(500);
                    console.error(err);

                } else {
                    if (user === null || user === undefined) {
                        res.send(404);

                    } else {
                        res.json(user);
                    }
                }
            });
        });

        /**
         * Get all users
         */
        app.get(restPrefix + '/users', function(req, res) {
            console.log('A request is done on /users on GET');

            User.find(function (err, users) {
                    if (err) {
                        res.send(500);
                        console.error(err);

                    } else {
                        if (users === null || users === undefined) {
                            res.send(404);

                        } else {
                            res.json(users);
                        }
                    }
                });
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

            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(500);
                    console.error(err);

                } else {
                    if (user === null || user === undefined) {
                        res.send(404);

                    } else {
                        for (var i in req.body) {
                            //noinspection JSUnfilteredForInLoop
                            user[i] = req.body[i];
                        }

                        user.save(function (err, user) {
                            if (err) {
                                res.send(500);
                                console.error(err);

                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            });
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

            var user = new User(req.body);
            user.save(function (err, user) {
                if (err) {
                    res.send(500);
                    console.error(err);

                } else {
                    res.json(user);
                }
            });
        });

        /**
         * Remove a user
         */
        app['delete'](restPrefix + '/users/:id', function(req, res) {
            console.log('A request is done on /user on DELETE with id - ' + req.params.id);

            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(500);
                    console.error(err);

                } else {
                    if (user === null || user === undefined) {
                        res.send(404);

                    } else {
                        user.remove(function (err) {
                            if (err) {
                                res.send(500);
                                console.error(err);

                            } else {
                                res.json(200);
                            }
                        });
                    }
                }
            });
        });

        console.log('End of initialization of the User REST api');
    };
})(module);