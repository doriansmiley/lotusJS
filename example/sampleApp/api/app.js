/**
 * Created by dsmiley on 1/27/15.
 */
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var Fs = require('fs');
var uploadPath = '/Users/dsmiley/workspace/lotusJS/example/sampleApp/api/images/';

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world! I am the mock API for developer testing.');
    }
});

server.route({
    method: 'OPTIONS',
    path: '/',
    handler: function (request, reply) {
        reply('cors enabled');
    },
    config: {
        cors: true
    }
});

server.route({
    method: 'POST',
    path: '/echoJSON/key/{0}',
    handler: function (request, reply) {
        //console.log(request.orig.payload.file);
        var response = reply(JSON.stringify(request.payload.inputJSON));
        response.type('application/json');
        response.code(200);

    },
    config: {
        validate: {
            payload: {
                inputJSON: Joi.object().required()
            }
        },
        cors: true
    }
});

server.route({
    method: 'OPTIONS',
    path: '/echoJSON/key/{0}',
    handler: function (request, reply) {
        reply('cors enabled');
    },
    config: {
        cors: true
    }
});

server.route({
    method: 'GET',
    path: '/{system_id}/{user_id}/{asset_type}/{visibility}',
    handler: function (request, reply) {
        var response = reply('{' +
            '"version":"0.99",' +
            '"count":4,' +
            '"photos": [' +
            '{"id":"5464022a4e696302aa000000","url":"http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13", "source":"sampleAPI"},' +
            '{"id":"5464096b4e696303b2000000","url":"http://www.rantplaces.com/wp-content/uploads/2014/10/Sunset-socialphy.com_.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13", "source":"sampleAPI"},' +
            '{"id":"5464096b4e696303b2000000","url":"https://qwrad.files.wordpress.com/2009/04/sunset-birds1.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13", "source":"sampleAPI"},' +
            '{"id":"5464096b4e696303b2000000","url":"https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13", "source":"sampleAPI"}' +
            ']' +
            '}'
        );
        response.type('application/json');
        response.code(200);
    },
    config: {
        cors: true
    }
});

server.route({
    method: 'OPTIONS',
    path: '/{system_id}/{user_id}/{asset_type}/{visibility}',
    handler: function (request, reply) {
        reply('cors enabled');
    },
    config: {
        cors: true
    }
});

server.register({
    register: Good,
    options: {
        reporters: [
            {
                reporter: require('good-console'),
                args: [
                    { log: '*', response: '*' }
                ]
            }
        ]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});