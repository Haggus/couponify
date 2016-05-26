const index = {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('hello world');
    }
};

module.exports = index;
