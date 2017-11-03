'use strict';
const PROJECT_NAME = 'projectName'; // folder name in /themes/..

const NODE_ENV = process.env.NODE_ENV || 'development';
const WATCH = process.env.WATCH || false;

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let buildType = NODE_ENV === 'development' ? 'dev-': 'prod-';

module.exports = function() {

    var result = {
        entry: "./themes/" + PROJECT_NAME + "/partials/index.js",
        output: {
            path: __dirname + "/themes/" + PROJECT_NAME + "/assets/js",
            filename: buildType + "app.js"
        },

        watch: !!WATCH,

        devtool: NODE_ENV === 'development' ? 'source-map': false,

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
                            presets: ["env"],
                            plugins: ["transform-object-rest-spread"]
                        }
                    }
                }
            ]
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new ExtractTextPlugin({
                filename: "../css/" + buildType + "app.css",
                allChunks: true
            })
        ],
    };

    if(NODE_ENV === 'production') {
        result.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                }
            })
        );
    }

    return result;
};


