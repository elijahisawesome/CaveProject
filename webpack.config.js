const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    index: './src/index.js',
    
  },/*
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },*/
  devtool: 'inline-source-map',
  devServer:{
    contentBase: './dist',
  },
  plugins: [

    new HtmlWebpackPlugin({

      title: 'development',

    }),

  ],
  module: {
    rules: [
      /*{
        test: /three\/examples\/js/,
        use: 'imports-loader?THREE=three'
      },*/
        {
        test: /\.(glb|gltf)$/,
        use:
          [{
          loader: 'file-loader',
          options:
            {
                outputPath: 'assets/models/'
            }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(mkv)$/,
          use: ['file-loader'],
        },
      ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
  

};