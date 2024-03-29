const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },      
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new NormalModuleReplacementPlugin(
      /^(..\/preact|preact)(\/[^/]+)?$/,
      function(resource) {
        const replMap = {
          'preact/hooks': path.resolve('node_modules/preact/hooks/dist/hooks.module.js'),
          'preact/jsx-runtime': path.resolve('node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
          'preact': path.resolve('node_modules/preact/dist/preact.module.js'),
          '../preact/hooks': path.resolve('node_modules/preact/hooks/dist/hooks.module.js'),
          '../preact/jsx-runtime': path.resolve('node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
          '../preact': path.resolve('node_modules/preact/dist/preact.module.js')
        };

        const replacement = replMap[resource.request];

        if (!replacement) {
          return;
        }

        resource.request = replacement;
      }
    )
  ]
};