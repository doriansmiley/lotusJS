module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'lib/xtag/*.js',
            '../lib/lotusJS-UMD.min.js',
            '../global/Globals.js',
            {pattern: 'unit/assets/**', watched: false, included: false, served: true},
            'typeScriptUnit/**/*.js'
        ],

        proxies: {
            "/local": "http://localhost"
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}
