module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'lib/lavender/lavenderJS-UMD.min.js',
            '../lib/lotusJS-UMD.min.js',
            '../global/Globals.js',
            'typeScriptUnit/**/*.js'
        ],

        proxies: {
            "/local": "http://localhost"
        },

        exclude: ['lib/angular/angular-scenario.js'],

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
