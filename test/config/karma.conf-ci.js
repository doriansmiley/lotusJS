var fs = require('fs');

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
      'SL_Firefox': {
          base: 'SauceLabs',
          browserName: 'firefox',
          version: '26'
      }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'lib/jquery/jquery-1.10.2.js',
        'lib/xtag/*.js',
        'lib/angular/angular.js',
        'lib/angular/angular-*.js',
        'lib/angular/angular-mocks.js',
        'lib/angular/angular-mocks.js',
        'lib/lavender/*.js',
        '../global/*.js',//set up the sdk namespace
        '../example/sampleApp/global/*.js',//set up the sample app namespace
        '../context/*.js',
        '../events/*.js',
        '../factory/*.js',
        '../services/*.js',
        '../view/AbstractComponent.js',
        '../view/AbstractItemView.js',
        '../view/AbstractCollectionView.js',
        '../view/*.js',
        '../actions/*.js',
        '../commands/*.js',
        '../context/*.js',
        '../example/sampleApp/js/actions/**/*.js',
        '../example/sampleApp/js/commands/**/*.js',
        '../example/sampleApp/js/model/**/*.js',
        '../example/sampleApp/js/serialization/**/*.js',
        '../example/sampleApp/js/services/**/*.js',
        '../example/sampleApp/js/factory/**/*.js',
        '../example/sampleApp/js/view/**/*.js',
        'unit/*.js',
        'unit/**/*.js'
    ],

      proxies: {
          "/local": "http://localhost"
      },

      exclude: ['lib/angular/angular-scenario.js'],

      autoWatch: true,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'saucelabs'],


    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Karma and Sauce Labs demo'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
