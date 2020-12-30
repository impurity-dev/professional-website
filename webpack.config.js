const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = (env, argv) => {
    return {
        entry: path.resolve(appDirectory, 'src/app.ts'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/main.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                publicPath: argv.mode === 'production' ? '/professional-website/' : '/',
                template: path.resolve(appDirectory, 'public/index.html'),
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'favicon.ico', to: 'favicon.ico' },
                    { from: 'public/assets', to: 'assets' },
                    { from: 'public/textures', to: 'textures' },
                ],
            }),
            new CleanWebpackPlugin(),
        ],
        devServer: {
            host: 'localhost',
            port: 8080,
            disableHostCheck: true,
            contentBase: path.resolve(appDirectory, 'public'),
            publicPath: '/',
            hot: true,
        },
    };
};
