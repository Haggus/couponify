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

const js = {
    method: 'GET',
    path: '/js/{file}',
    config: {
        auth: false,
        handler: function(request, reply) {
            reply.file('js/' + request.params.file);
        }
    }
};

module.exports = [index, js];
