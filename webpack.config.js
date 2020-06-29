var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './resources/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            },
            {  
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']  
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};