const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: {
        'lotusJS-UMD': './src/index.ts',
        'lotusJS-UMD.min': './src/index.ts'
    },
    mode:'production',
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
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: true,
        })],
    },
    devtool: 'source-map',
    plugins: [
        new TypedocWebpackPlugin({
            name: 'LotusJS',
            mode: 'file',
            // theme: './typedoc-theme/',
            ignoreCompilerErrors: true,
            excludePrivate:true,
            includeDeclarations:true,
            excludeExternals:true
        }, './src'),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
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
