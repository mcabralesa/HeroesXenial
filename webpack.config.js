const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry:
     {
       polyfills: './src/polyfills.ts',
       app: './src/main.ts',
       css: './src/style.scss'
     },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [

    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};