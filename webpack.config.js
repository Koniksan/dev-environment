'use strict';
const PROJECT_NAME = 'tomograf';

const NODE_ENV = process.env.NODE_ENV || 'development';
const WATCH = process.env.WATCH || false;

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./themes/" + PROJECT_NAME + "/partials/index.js",
    output: {
        path: __dirname + "/themes/" + PROJECT_NAME + "/assets/js",
        filename: "app.js"
    },

    watch: true,

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader", options: {sourceMap: true}},
                        {loader: "postcss-loader",options: {config: {ctx: {autoprefixer: ['last 2 versions', 'ie 10']}},sourceMap:true,}}
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: "../css/app.css",
            allChunks: true
        })
    ],
};

if(NODE_ENV === 'production') {
    webpack.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
