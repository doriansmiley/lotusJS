module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            '../lib/lavenderJS-UMD.min.js',
            '../global/Lavender.js',
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
            suite: 'exporterTests'
        }

    })
}
