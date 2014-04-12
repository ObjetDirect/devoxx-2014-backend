/* global describe: true */

describe('Tests for repository/user.js component', function () {
    var User;

    beforeEach(function () {
        User = require('../../repository/user');
    });

    it('Should new user to be defined', function () {
        var user = new User();
        expect(user).toBeDefined();
    })
});