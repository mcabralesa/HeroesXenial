// #docplaster
// #docregion
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // #docregion entries, one-entry, two-entries
  entry: {
    // #enddocregion one-entry, two-entries
    'polyfills': './src/polyfills.ts',
    // #docregion two-entries
    //'vendor': './src/vendor.ts',
    // #docregion one-entry
    'app': './src/main.ts',
    'css': './src/style.scss'
  },
  // #enddocregion entries, one-entry, two-entries

  // #docregion resolve
  resolve: {
    extensions: ['.ts', '.js']
  },
  // #enddocregion resolve

  // #docregion loaders
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }

    ]
  },
  // #enddocregion loaders

  // #docregion plugins
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'}
    ]),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
  // #enddocregion plugins
};
// #enddocregion

