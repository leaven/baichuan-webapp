var path                      = require('path');
var webpack                   = require("webpack");
var COMMON_PATH               = path.resolve('./common');
var INDEX_PATH                = path.resolve('./index');
var HtmlWebpackPlugin         = require('html-webpack-plugin');
var ExtractTextPlugin         = require('extract-text-webpack-plugin');
var extractLESS               = new ExtractTextPlugin('static/styles/[name]_[hash]_bundle.css');
module.exports = {
  //入口文件
  entry: {
      vendors: ['react', 'redux', 'react-dom', 'react-redux'],
      index: [path.resolve(INDEX_PATH, './bootstrap.js')]
  },
  //输出文件
  output: {
      path: path.resolve('../public'),
      filename: 'static/js/[name]_[hash]_bundle.js',
      chunkFilename: "static/js/[name]_[hash]_chunk.js"
  },
  resolve: {
    root: path.resolve(__dirname, '.'),
    modulesDirectories: ['./node_modules'],
    alias: {
      'common': COMMON_PATH,  // common根目录
    },
    extensions: ['', '.js', '.jsx','.less', '.css']
  },
  module: {
    /*loader插件，以！分割，chain处理*/
    loaders:[
      { 
          // 在页面中加载图片示例：var imgstr = require("./imgs/3.png");
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'url?limit=5120&name=static/images/[name]_[hash].[ext]'
            // 'image-webpack?{bypassOnDebug:true, progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
      },
      { 
          test: /\.js[x]?$/, 
          exclude: /node_modules/,
          loaders: ['babel'],
          include: [COMMON_PATH, INDEX_PATH]
      },
      { 
        test: /\.(eot|woff|svg|ttf)$/, 
        loader: 'file?name=static/font/[name]_[hash].[ext]'
      },
      {
            test: /\.(less|css)$/, 
            loader: extractLESS.extract(['style','css','autoprefixer','less'])
      }
    ]
  },
  plugins: [
    // 将common.js单独提出
    new webpack.optimize.CommonsChunkPlugin({name:"common",filename:"static/js/common_[hash]_bundle.js",chunks:["index"]}),
    // 如果在entry有一个chunk叫vendors，那么在plugins添加一个也叫vendors的chunk，
    // 则其他chunks中跟vendors共有的代码模块将全部被提取到vendors中
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendors", /* filename= */"static/js/venders_[hash]_bundle.js"),
    new webpack.ProvidePlugin({
      React: "react",
      "window.React": "react",
      ReactDOM: "react-dom",
      "window.ReactDOM": "react-dom",
      'classNames': 'classnames',
    }),
    new HtmlWebpackPlugin({
        title: '百川',
        template: 'index/layout.html', // 源模板文件
        filename: './page/index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunks: ["common", "vendors", "index"]
    }),
    extractLESS
  ]
}
