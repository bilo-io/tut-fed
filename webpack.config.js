var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');

var config = {
    entry: {
        path: SRC + '/app.js'
    },
    output: {
        path: DIST,
        publicPath: '/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                loaders: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'}),
        new CopyWebpackPlugin([
            {
                from: './src/style.scss',
                to: './'
            }
        ])
    ],
    devtool: 'source-maps',
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};

module.exports = config;