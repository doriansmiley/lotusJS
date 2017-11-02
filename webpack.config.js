var path = require('path');
var webpack = require('webpack');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
    entry: {
        'lotusJS-UMD': './src/index.ts',
        'lotusJS-UMD.min': './src/index.ts'
    },
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
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
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
    externals: {
        "lavenderjs/lib": "Lavender"
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            query: {
                declaration: false,
            }
        }]
    }
};