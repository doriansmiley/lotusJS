/**
 * Created by dsmiley on 2/5/15.
 */
module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 30000,
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)
                    require: function () {
                        var chai = require('chai');
                        chai.Assertion.addMethod('toBe', function (expected) {
                            return this.equal(expected);
                        });
                        chai.Assertion.addMethod("toBeDefined", function () {
                            return this.defined;
                        });
                        chai.Assertion.addMethod("toBeUndefined", function () {
                            return this.undefined;
                        });
                        chai.Assertion.addMethod("toBeTruthy", function () {
                            return this.ok;
                        });
                        chai.Assertion.addMethod("toBeCloseTo", function (expected, precision) {
                            precision = precision !== undefined ? precision : 2;
                            var delta = (Math.pow(10, -precision) / 2);
                            this.assert(
                                Math.abs(expected - this._obj) < delta
                                , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
                                , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
                            );
                        });
                        expect = chai.expect;
                        Lavender = require('./lib/lavenderJS-UMD.min.js');
                        jasmine = {};
                    }
                },
                src: [
                    'test/typeScriptUnit/**/*.js'
                ]
            }
        }
    });

    grunt.registerTask('default', 'mochaTest');

};