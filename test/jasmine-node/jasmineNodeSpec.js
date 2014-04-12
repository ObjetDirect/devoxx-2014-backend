/* global define: true, describe: true, it: true, expect: true */

/**
 * A module to check if jasmine-node can run tests
 *
 * @module test/jasmineNodeSpec
 * @version 1.0
 * @since 1.0
 * @author Frédéric Dubois
 */
describe('Test suite for Node - ', function () {
    // Check if Jasmine-node can run this test
    it('Checking the assert works', function () {
        expect(true).toBe(true);
    });
});
