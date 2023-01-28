const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const { generateVersion } = require('./generateVersion')
// const HelloWorldPlugin = require('./HelloWorldPlugin')

// const options = global.versionOptions
// const { version, relativePath } = options


// console.log(version, target)                                              , ,                  xxxxxxx
const devMode = true;
const entryObj = {};
const HtmlWebpackPluginArr = [];
function setSingle() {
    entryObj['index'] = [`./src/index.js`];
    const obj = new HtmlWebpackPlugin({
        template: `./src/index.html`,
        filename: `index.html`,
        chunks: ['index'],
        title: 'tripdocs',
        inject: 'body',
        scriptLoading: 'blocking',
    });
    HtmlWebpackPluginArr.push(obj);
    // console.log(entryObj, HtmlWebpackPluginArr);
}
setSingle();

module.exports = {
    entry: entryObj,
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        // 相对于URL的路径，输出文件路径
        // This is an important option
        // when using on-demand-loading or
        // loading external resources like images, files, etc.
        // If an incorrect value is specified you'll
        // receive 404 errors while loading these resources.
        // react The publicPath property is a special property that helps us with our dev-server. It specifies the public URL of the the directory — at least as far as webpack-dev-server will know or care. If this is set incorrectly, you’ll get 404’s as the server won’t be serving your files from the correct location!
        publicPath: './',
        // publicPath: '//webresource.fws.qa.nt.ctripcorp.com/restripdoc/R1',
        // 输出目录绝对路径
        path: path.resolve(__dirname, 'dist'),
        clean: {
            keep: /\.ares\//, // Keep these assets under 'ignored/dir'.
        },
    },
    // extensions 省略后缀
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },
    plugins: [
        ...HtmlWebpackPluginArr,
        // new CleanPlugin(), // 打开以后ares要重新配置
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // new BundleAnalyzerPlugin(),
        // new HelloWorldPlugin()
    ],
    optimization: {
        splitChunks: {
            // enforceSizeThreshold: 2.5 * 1024 * 1024,
            // minSize: 2 * 1024 * 1024, //提取出的chunk的最小大小
            // maxSize: 2.5 * 1024 * 1024,
            // maxInitialRequests: 3, (?!(react|react-dom|antd|jquery|lodash|faker))
            cacheGroups: {
                vendors: {
                    //拆分第三方库（通过npm|yarn安装的库）
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    // maxInitialSize: 2.3 * 1024 * 1024,
                    // maxSize: 2.5 * 1024 * 1024,
                },
            },
        },
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/i,
                // ?modules&localIdentName=[path][name]-[local]-[hash:5]
                use: ['style-loader', 'css-loader'],
            },
            {
                /*src目录下面的以.js结尾的文件，要使用babel解析*/
                /*cacheDirectory是用来缓存编译结果，下次编译加速*/
                test: /\.(js|.jsx)$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            // The following webpack.config.js can load CSS files,
            // embed small PNG/JPG/GIF/SVG images as well as fonts as Data URLs
            // and copy larger files to the output directory.
            // npm install sass-loader node-sass webpack --save-dev
            //     {
            //     test: /\.(sa|sc)ss$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 hmr: process.env.NODE_ENV === 'development',
            //             },
            //         },
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                },
            },
        ],
    },
};
