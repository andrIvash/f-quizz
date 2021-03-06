
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
const webpack  = require('webpack');
const path = require('path');
// import StyleLintPlugin from 'stylelint-webpack-plugin';

module.exports = {
  context: path.join(__dirname, '/src'),
  devtool: 'source-map',
  entry: {
    app: ['./scripts/main.js'],
    app2: ['./scripts/main2.js']
  },
  output: {
    // publicPath: '',        
    filename: 'assets/scripts/[name].bundle.js',
    path: path.join(__dirname, './build')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'assets/scripts/common.js',
      minChunks: 2
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      //CDN: JSON.stringify('https://ad.csdnevnik.ru/special/staging/riff/assets/')
      CDN: JSON.stringify('assets/')
    })
    // new StyleLintPlugin({
    //   configFile: './.stylelintrc',
    // })
    // new FaviconsWebpackPlugin('./favicon.png')
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
      // {
      //   test: /\.js$/,
      //   enforce: "pre",
      //   exclude: /(node_modules|bower_components)/,
      //   loader: "eslint-loader",
      //   options: {
      //       fix: true
      //   }
      // },
    ]
  }
};
