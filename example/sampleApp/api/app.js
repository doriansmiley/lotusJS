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
    method: 'POST',
    path: '/{system_id}/{user_id}/{asset_type}/{visibility}',
    handler: function (request, reply) {
        //console.log(request.orig.payload.file);
        var writeStream = Fs.createWriteStream(uploadPath + request.payload.fileName);
        // This is here incase any errors occur
        writeStream.on('error', function (err) {
            console.log(err);
            reply('thanks');
        });
        //writeStream.pipe(request.payload.file);
        var stream = request.payload.file.pipe(writeStream);
        // After all the data is saved, respond with a sample asset. This asset will need to be reachable by services on dvsql, so be sure to update the URL field of a publicly available file
        stream.on('close', function () {
            var response = reply('{"id":"5464096b4e696303b2000000","url":"http://wallfinest.com/wp-content/uploads/2014/06/vintage-sunset-wallpaper.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13"}');
            response.type('text/plain');
            response.code(200);
        });

    },
    config: {
        validate: {
            payload: {
                owner: Joi.string().min(1).required(),
                fileName: Joi.string().min(1).required(),
                file: Joi.object().required()
            }
        },
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: true
        },
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
            '{"id":"5464022a4e696302aa000000","url":"http://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
            '{"id":"5464096b4e696303b2000000","url":"http://www.rantplaces.com/wp-content/uploads/2014/10/Sunset-socialphy.com_.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
            '{"id":"5464096b4e696303b2000000","url":"https://qwrad.files.wordpress.com/2009/04/sunset-birds1.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
            '{"id":"5464096b4e696303b2000000","url":"https://www.broomehovercraft.com.au/graphics/bht/popups/gallery-sunset-6.jpg","created_date":"2014-11-13","last_access_date":"2014-11-13"}' +
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

server.route({
    method: 'DELETE',
    path: '/{system_id}/{user_id}/{asset_type}/{object_name}',
    handler: function (request, reply) {
        var response = reply('success');
        response.type('text/plain');
        response.code(204);
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