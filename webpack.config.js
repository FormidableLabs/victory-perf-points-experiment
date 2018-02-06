const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

const path = require("path");
var isProd = process.env.NODE_ENV === 'production'; //true or false
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
module.exports = {
    entry: {
        app: './src/index.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    devtool: 'source-maps',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")

                    // Note: Experiment -- rebabel all victory
                    // path.resolve(__dirname, "node_modules/victory"),
                    // path.resolve(__dirname, "node_modules/victory-chart"),
                    // path.resolve(__dirname, "node_modules/victory-core"),
                    // path.resolve(__dirname, "node_modules/victory-pie")
                ],
                //exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
            },
            {
                test: /\.(png|jpg|gif)(\?[\s\S]+)?$/,
                use: 'file-loader?name=images/[name].[ext]',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]',
            },

            // Use one of these to serve jQuery for Bootstrap scripts:

            // Bootstrap 3
            { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        stats: "errors-only"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React 101 with Petr Tichy aka @ihatetomatoes',
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.DefinePlugin({
          // A common mistake is not stringifying the "production" string.
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: true
        })
    ]
}