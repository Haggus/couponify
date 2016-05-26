'use strict';

const Hapi = require('hapi');
const Mongoose = require('mongoose');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('hello world');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    Mongoose.connect('mongodb://localhost/couponify');

    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error: '));
    db.open('open', function() {
        console.log('Connection to database: OPEN');
    });

    console.log('Server running at: ', server.info.uri);
});
