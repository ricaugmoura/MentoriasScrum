/**
 * Jest configuration file
 */
module.exports = {
    // Specify that tests run inside Node environment rather than JSDOM browser mockup
    testEnvironment: 'node',

    // Pattern to locate files under tests/ containing .test.js in the filename
    testMatch: ['**/tests/**/*.test.js'],

    // Print detailed logs for individual test suites during runs
    verbose: true,

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true
};
