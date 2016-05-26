'use strict';

const Path = require('path');

const Hapi = require('hapi');
const Tokens = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');
const Router = require('hapi-router');
const Mongoose = require('mongoose');
const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'src/public')
            }
        }
    }
});
server.connection({ port: 3000 });

var admins = {
    1: {
        id: 1,
        company: 'Test Company'
    }
};

var secret = 'super_secret_key';

var token = JWT.sign(admins[1], secret);
console.log('Generated access token: ');
console.log(token);
console.log(' ');

server.register([
    {
        register: Inert
    },
    {
        register: Tokens
    },
    {
        register: Router,
        options: {
            routes: 'src/routes/**/*.js'
        }
    }
], function(err) {
    if (err) {
        console.error(err);
    } else {
        server.start((err) => {
            if (err) {
                console.error(err);
            }

            server.auth.strategy('jwt', 'jwt', {
                key: secret,
                validateFunc: function(decoded, request, callback) {
                    if (!admins[decoded.id]) {
                        return callback(null, false);
                    } else {
                        return callback(null, true);
                    }
                },
                verifyOptions: {
                    algorithms: ['HS256']
                }
            });

            server.auth.default('jwt');

            Mongoose.connect('mongodb://localhost/couponify');

            const db = Mongoose.connection;
            db.on('error', console.error.bind(console, 'Database connection error: '));
            db.open('open', function() {
                console.log('Connection to database: OPEN');
            });

            console.log('Server running at: ', server.info.uri);
        });
    }
});

