const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// if (process.env.NODE_ENV === 'analyse') {
//   plugins.push(new BundleAnalyzerPlugin());
// }

const isProd = process.env.NODE_ENV === 'production';
const outputDirectory = 'dist';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    devtool: isProd ? false : 'inline-source-map',
    devServer: isProd
        ? {}
        : {
              port: 8080,
              historyApiFallback: true,
              open: true,
          },
    optimization: isProd
        ? {
              minimize: true,
              minimizer: [
                  new TerserPlugin({
                      cache: true,
                      parallel: true,
                  }),
              ],
          }
        : {},
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV', 'SOCKET_URL']),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico',
        }),
    ],
};
