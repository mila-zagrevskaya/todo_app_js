const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');


const common = merge([
  {
    entry: {
      home: './src/index.js',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
      new ExtractTextPlugin('[name].min.css'),
      new MiniCssExtractPlugin({
        filename: 'all.css',
      }),
    ],


    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.css', '.style'],
    },
  },
]);


const development = {
  devtool: 'source-map',
  mode: 'development',
};
const production = {
  devtool: false,
  mode: 'production',
};


module.exports = function (env, argv) {
  if (argv.mode === 'development') {
    return merge([
      common,
      development,
    ]);
  } if (argv.mode === 'production') {
    return merge([
      common,
      production,
    ]);
  }
}
