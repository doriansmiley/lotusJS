module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'lib/xtag/*.js',
            'lib/lavender/*.js',
            '../global/*.js',//set up the sdk namespace
            '../example/sampleApp/js/global/*.js',//set up the sample app namespace
            '../context/*.js',
            '../events/*.js',
            '../factory/*.js',
            '../services/*.js',
            '../view/AbstractComponent.js',
            '../view/AbstractItemView.js',
            '../view/AbstractCollectionView.js',
            '../view/*.js',
            '../actions/*.js',
            '../command/*.js',
            '../context/*.js',
            '../example/sampleApp/js/actions/**/*.js',
            '../example/sampleApp/js/commands/**/*.js',
            '../example/sampleApp/js/model/**/*.js',
            '../example/sampleApp/js/serialization/**/*.js',
            '../example/sampleApp/js/services/**/*.js',
            '../example/sampleApp/js/factory/**/*.js',
            '../example/sampleApp/js/view/**/*.js',
            '../example/sampleApp/js/app/**/*.js',
            {pattern: 'unit/assets/**', watched: false, included: false, served: true},
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
