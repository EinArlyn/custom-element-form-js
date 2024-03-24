const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/utils/custom-component/render.js',
  output: {
    library: {
      type: 'module',
    },
    path: path.resolve(__dirname, './src/utils/custom-component/dist'),
    filename: 'render.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
        }
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  experiments: {
    outputModule: true,
  },
};