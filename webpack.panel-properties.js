const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/utils/custom-component/panel-properties.js',
  output: {
    library: {
      type: 'module',
    },
    path: path.resolve(__dirname, './src/utils/custom-component/dist'),
    filename: 'panel-properties.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader')
        }
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  experiments: {
    outputModule: true,
  },
  devtool: 'cheap-module-source-map'
};