var path = require('path');
var webpack = require('webpack');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        'lotusJS-UMD': './src/index.ts',
        'lotusJS-UMD.min': './src/index.ts'
    },
    mode:"production",
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Lotus',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        "lavenderjs/lib": "Lavender"
    },
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true,
        })],
    },
    devtool: 'source-map',
    plugins: [
        new TypedocWebpackPlugin({
            name: 'LotusJS',
            mode: 'file',
            //theme: './typedoc-theme/',
            ignoreCompilerErrors: true,
            excludePrivate:true,
            includeDeclarations:true,
            excludeExternals:true
        }, './src')
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};