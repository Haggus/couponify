'use strict';

const Hapi = require('hapi');
const Router = require('hapi-router');
const Mongoose = require('mongoose');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([
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

