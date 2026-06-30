const js = require('@eslint/js');
const globals = require('globals');

/**
 * ESLint Flat Configuration
 */
module.exports = [
    // Standard recommended rules from ESLint
    js.configs.recommended,

    // Server-side Node, Jest, and script files configuration
    {
        files: [
            'src/**/*.js',
            'scripts/**/*.js',
            'tests/**/*.js',
            'eslint.config.js',
            'jest.config.js'
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
                process: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off', // Logging is allowed in backend server and scripts
            'no-undef': 'error'
        }
    },

    // Client-side Browser files configuration
    {
        files: ['public/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                ...globals.browser,
                io: 'readonly' // Socket.io client script global object
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off'
        }
    }
];
