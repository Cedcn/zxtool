const webpack = require('webpack');

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'redux-thunk',
  'react-redux',
];

module.exports = {
  output: {
    path: 'public',
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    lib: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: './config/manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
};
