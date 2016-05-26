const index = {
    method: 'GET',
    path: '/',
    config: {
        auth: false,
        handler: function(request, reply) {
            reply.file('index.html');
        }
    }
};

module.exports = index;
