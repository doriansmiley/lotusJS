module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'lib/jquery/jquery-1.10.2.js',
            'lib/angular/angular.js',
            'lib/angular/angular-*.js',
            'lib/angular/angular-mocks.js',
            'lib/angular/angular-mocks.js',
            'lib/matrixjs/matrix-1.2.0.min.js',
            'lib/canvg/rgbcolor.js',
            'lib/canvg/canvg.js',
            '../global/Lavender.js',//set up the sdk namespace
            '../util/*.js',
            '../util/**/*.js',
            '../control/AbstractEventDispatcher.js',
            '../control/JqueryEventDispatcher.js',
            '../control/AngularEventDispatcher.js',
            '../events/**/*.js',
            '../control/*.js',
            '../control/actions/*.js',
            '../model/lists/*.js',
            '../model/recordset/*.js',
            '../model/**/*.js',
            '../services/**/*.js',
            '../factory/**/*.js',
            'unit/utilsTests/**/*.js'
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
            suite: 'exporterTests'
        }

    })
}
