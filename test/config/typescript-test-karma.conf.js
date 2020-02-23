module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            {pattern: 'unit/assets/**', watched: false, included: false, served: true},
            {pattern: 'unit/templates/**', watched: false, included: false, served: true},
            'unit/**/*.js'
        ],

        proxies: {
            "/local": "http://localhost"
        },

        reporters: ['spec'],

        exclude: ['lib/angular/angular-scenario.js'],

        singleRun: true,

        frameworks: ['jasmine', 'browserify'],

        browsers: ['Chrome'],

        preprocessors: {
            'unit/functional/**/*.js': [ 'browserify' ]
        },

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-browserify'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}
