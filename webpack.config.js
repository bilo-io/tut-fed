var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');

var config = {
    entry: {
        path: SRC + '/app.js'
    },
    output: {
        path: DIST,
        publicPath: 'http://localhost:6565/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: [
                    'style-loader', 'css-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'})],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};

module.exports = config;