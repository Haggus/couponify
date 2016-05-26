const index = {
    method: 'GET',
    path: '/',
    config: {
        auth: false,
        handler: function(request, reply) {
            reply('hello world');
        }
    }
};

module.exports = index;
