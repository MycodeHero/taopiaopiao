var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //在开发模式中方便调试
    devtool: 'cheap-module-eval-source-map',
    //主入口文件，当webpack找到配置文件时候回找到所在的主入口文件，并从主入口文件中找到依赖chain
    entry: [
        //react的热更新功能
        'react-hot-loader/patch',
        //webpack热更新中间件 客户端与服务器之间的发生改变从而产生热更新
        'webpack-hot-middleware/client?reload=true',
        //主入口文件 path是node的内置模块
        path.resolve(__dirname, './src/index.js')
    ],
    //输出文件可以是打包之后的文件，也可是是在内存中开辟的webpack服务器
    output: {
        //打包之后的文件民盛
        filename: 'bundle.js',
        //打包到本地的路径
        path: path.resolve(__dirname, './dist'),
        //打包到服务的路径
        publicPath: 'http://localhost:3000/'
    },
    //解决依赖的文件的后缀名
    resolve: {
        extensions: ['.js', '.less', 'jsx'],
        alias:{
            components: path.resolve(__dirname, 'src/js/components'),
            api: path.resolve(__dirname, 'api'),
            common: path.resolve(__dirname, 'src/js/common'),
            view: path.resolve(__dirname, 'src/js/view')
        }
    },
    //装载机
    module: {
        rules: [
            {
                test: /.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /.(png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096
                        }
                    }
                ]
            }
        ]
    },
    //引用插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: "淘票票",
            template: 'src/index.html',
            inject: 'body'
        })
    ]
}