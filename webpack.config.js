module.exports = {
    entry: ['whatwg-fetch', './src/public/src/main.js'],
    output: {
        path: __dirname,
        filename: 'src/public/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
