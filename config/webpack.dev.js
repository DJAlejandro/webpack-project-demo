const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const path = require("path")
const webpack = require("webpack")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devConfig = {
    mode:'development',
    output: {
        pathinfo: false,
        filename: "js/[name].js",
        chunkFilename: "js/[name]-chunk.js",
        publicPath: "/"
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    devtool: "cheap-module-eval-source-map",//在大多数情况下，最佳选择是 cheap-module-eval-source-map
    devServer: {
        publicPath: "/",
        port: 1111,
        quiet: true, //// 不显示 devServer 的 Console 信息，让 FriendlyErrorsWebpackPlugin 取而代之
        // host: '192.168.31.240',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: true,
        compress: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 600, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位   
            poll: 2000 //轮询间隔，specifying a poll interval in milliseconds
        }
    },
    module: {
        rules: [
            {
              enforce: "pre",
              test: /\.js$/,
              include: path.resolve(__dirname, "../src"),
              loader: "eslint-loader",
              options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                  formatter: require('eslint-formatter-friendly'), // 指定错误报告的格式规范
              }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-bundle.[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-bundle.[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig)
