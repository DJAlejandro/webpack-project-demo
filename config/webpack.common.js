//一般情况下publicPath应该以‘/’结尾，而其他loader或插件的配置不要以‘/’开头
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); //html插入dll.js
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

let devMode = process.env.NODE_ENV !== "production";
// console.log(process.env.NODE_ENV)

// const HappyPack = require("happypack");//多线程loader 加快编译速度
// const os = require("os");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    context: path.resolve(__dirname, "../"), //改
    entry: {
        index: "./src/js/index.js",
        app: "./src/js/app.js"
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js" //不能直接在客户端使用npm install之后的vue
        },
        modules: [path.resolve(__dirname, "../node_modules")]
    },
    // externals: {
    //     jquery: "jQuery"
    // },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use:[{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                use: {
                  loader: 'babel-loader?cacheDirectory',
                },
            },
            {
              test: /\.(sa|sc|c)ss$/,
              include: path.resolve(__dirname, "../src"),
              use: [
                devMode?{loader: "style-loader",options: {sourceMap: true}} : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: devMode
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        sourceMap: devMode,
                        config: {
                            path: "postcss.config.js" //这个得在项目根目录创建此文件
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: devMode
                    }
                }
              ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html", // filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
            template: "index.ejs",
            title: "测试webpack",
            favicon: "./favicon.ico",
            minify: {
                collapseWhitespace: true, //删除空格，但是不会删除SCRIPT、style和textarea中的空格
                collapseBooleanAttributes: true, //省略只有boolean值的属性值,比如：readonly checked
                keepClosingSlash: true, //在单例元素上保留尾部斜杠
                minifyJS: true, //是否压缩html里的js（使用uglify-js进行的压缩
                minifyCSS: true, //是否压缩html里的css（使用clean-css进行的压缩）
                minifyURLs: true,
                removeComments: true, // 删除注释，但是会保留script和style中的注释
                removeRedundantAttributes:true, //HTML 4.01中的某些属性具有默认值,删除多余的属性
                removeEmptyAttributes: true, // 删除空（或空白）属性
                removeScriptTypeAttributes: true, //从脚本标签中删除type="text/javascript"
                removeStyleLinkTypeAttributes: true, //从style和link标签中删除type="text/css"
                sortAttributes: true, //按频率对属性排序
                sortClassName: true, //按频率对class排序
                useShortDoctype: true, //如果文档被定义为除HTML5之外的任何内容（例如HTML 4.01）,现有的doctype被替换为它短的（HTML5）中译本<!DOCTYPE html>
            }
        }),
        new InlineManifestWebpackPlugin('manifest'),
        new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname,'../dll/*.dll.js') }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DllReferencePlugin({
            manifest: require("../dll/vue-manifest.json")
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name]-[contenthash:5].min.css',
          chunkFilename: 'css/[name]-chunk-[contenthash:5].min.css'
        })
    ]
};
