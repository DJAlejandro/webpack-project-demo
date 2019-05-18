const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.js");

const path = require("path")
const webpack = require("webpack")

const CleanWebpackPlugin = require("clean-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/*Tree Shaking*/

const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require("glob-all");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

/*压缩*/
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(webpackBaseConfig, {
    mode:'production',
    output: {
        filename: "js/[name]-[chunkhash:5].js",
        chunkFilename: "js/[name]-chunk-[chunkhash:5].js",
        publicPath: "./",
        path: path.resolve(__dirname, "../dist/")
    },
    optimization: {
        namedChunks: false,
        usedExports: true,
        sideEffects: true,
        runtimeChunk: {
          name: 'manifest'
        },
        minimizer: [
          new OptimizeCSSAssetsPlugin(),
          new UglifyJsPlugin({
            cache: true, //Default path to cache directory: node_modules/.cache/uglifyjs-webpack-plugin
            parallel: true, //Default number of concurrent runs: os.cpus().length - 1
            uglifyOptions: {
              compress: {
                drop_console: true, //删除console.*函数
                drop_debugger: true // 移除 debugger
              }
            }
          })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                jquery: { 
                    test: /jquery/,
                    chunks: 'all',
                    minChunks: 1,
                    minSize:0,
                    name: 'jquery',
                    priority: 100,
                },
                asyncs: {  // 异步加载公共包、组件等
                    chunks: 'async',
                    minChunks: 2,
                    minSize:0,
                    name: 'async-commons',
                    priority: 90,
                },
                commons: { // 其他同步加载公共包
                    chunks: 'all',
                    minChunks: 2,
                    minSize:0,
                    name: 'common',
                    priority: 80,
                },
                styles: {
                  name: 'styles',
                  test: /\.(scss|css)$/,
                  chunks: 'all',
                  minChunks: 1,
                  reuseExistingChunk: true,
                  enforce: true
                }

            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8 * 1024,
                            outputPath: "assets/imgs/",
                            name: "[name]-[hash:5].[ext]",
                            publicPath: "../assets/imgs/"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 80
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: "80-90",
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8 * 1024,
                        outputPath: "assets/fonts/",
                        name: "[name]-[hash:5].[ext]",
                        publicPath: "../assets/fonts/"
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, '../*.ejs'),
              path.join(__dirname, '../src/js/*.js')
            ])
        }),
        new BundleAnalyzerPlugin({
            analyzerPort:1274, //默认值：8888。将在服务器模式下用于启动HTTP服务器的端口。
            // openAnalyzer:false //默认值：true。 在默认浏览器中自动打开报告。
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin(),
        new LodashModuleReplacementPlugin()
    ]
})
