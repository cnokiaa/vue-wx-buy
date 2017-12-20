var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var p=(process.env.NODE_ENV === 'production');
module.exports = {
  entry: {
    app:'./src/main.js'
  },
  output: {
    path: path.resolve(__dirname, p?'./build/dist':'./dist'),
    publicPath: p?'./dist/':'/dist/',
    filename: 'build.js'
  },
  externals:{
    wx:'jweixin'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')()]
        }
      },
      {
        test:/\.css$/,
        loaders:['style-loader','css-loader', 'autoprefixer-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }, 
      {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192'
      } 
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      hash:true,
      title: '电信信用购机',
      baseurl:'http://b.lakala.com/cl_wx/credit-loan-wx-telecom',
      template:'./entry.html',
      filename: '../index.html'
    })
  ])
}

// if (process.env.NODE_ENV === 'development') {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new HtmlWebpackPlugin({
//       hash:true,
//       title: '0元购机',
//       baseurl:'http://192.168.19.140:8080',
//       template:'./entry.html',
//       filename: '../index.html'
//     })
//   ])
// }


module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.IgnorePlugin(/jweixin-1.0.0.js$/)
]);

