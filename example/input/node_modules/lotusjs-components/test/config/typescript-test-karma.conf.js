module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            '../node_modules/x-tag/lib/webcomponents.js',
            '../node_modules/x-tag/dist/x-tag-core-with-shadowdom.min.js',
            '../node_modules/lavenderjs/lib/lavenderJS-UMD.min.js',
            '../lib/lotusJS-UMD.min.js',
            '../global/Globals.js',
            {pattern: 'unit/assets/**', watched: false, included: false, served: true},
            'unit/**/*.js'
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
