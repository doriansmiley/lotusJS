module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'lib/jquery/jquery-1.10.2.js',
            'lib/xtag/x-tag-components.js',
            'lib/angular/angular.js',
            'lib/angular/angular-*.js',
            'lib/angular/angular-mocks.js',
            'lib/angular/angular-mocks.js',
            'lib/lavender/*.js',
            '../global/*.js',//set up the sdk namespace
            '../context/*.js',
            '../factory/*.js',
            '../services/*.js',
            '../view/*.js',
            'unit/*.js',
            'unit/**/*.js'
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
