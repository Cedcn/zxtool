const path = require('path');
const webpack = require('webpack');
// const process = require('process');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const config = {
  context: __dirname,
  entry: {
    app: ['./client/App.jsx', hotMiddlewareScript],
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    root: [
      path.join(__dirname, '/')
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    noParse: [],
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=25000'},
      {
        test: /\.scss$|\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css?minimize&modules!postcss!sass')
      },
      {test: /\.(ttf|eot|svg|mp4|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'}
    ]
  },
  postcss: () => {
    return [ autoprefixer ];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = config;
