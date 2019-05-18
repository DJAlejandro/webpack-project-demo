//webpack.dll.js
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
    mode:'production',
    entry: {
        vue: ["vue/dist/vue.common.js", "vue-router"]//不能直接在客户端使用npm install之后的vue
    },
    output: {
        path: path.resolve(__dirname, "../dll"),
        filename: "[name]-[chunkhash:5].dll.js",
        library: "[name]"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, "../dll", "[name]-manifest.json"),
            name: "[name]"
        })
    ]
};
