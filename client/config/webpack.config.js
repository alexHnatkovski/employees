const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = true;

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: [path.join(__dirname, '../js/index.tsx')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx','.ts', '.tsx', '.scss'],
        modules: [path.resolve(__dirname,'../../node_modules/')]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { enforce: "pre", test: /\.(ts|tsx)$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
            },
            
            {
                test: /\.scss$/,
                use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
              }
            
            // { enforce: "pre", test: /\.scss$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
          }),
        new HtmlWebpackPlugin({ template: path.resolve(path.join(__dirname, '../index.html'))})
    ]
}