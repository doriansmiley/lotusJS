module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            {pattern: 'unit/assets/**', watched: false, included: false, served: true},
            {pattern: 'unit/templates/**', watched: false, included: false, served: true},
            '../lib/lotusJS-UMD.js',
            '../node_modules/immutable/dist/immutable.js',
            'unit/**/*.js'
        ],

        proxies: {
            "/local": "http://localhost"
        },

        reporters: ['spec'],

        exclude: ['lib/angular/angular-scenario.js'],

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-spec-reporter',
            'karma-jasmine',
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}
