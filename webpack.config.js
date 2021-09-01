const path = require('path');

module.exports = {
  mode: "production", 
  entry: {
    index: "./src/index.js",
    pageProduct: './src/product.js',
    pageCart: './src/cart.js',
    pageThankyou: './src/thankyou.js',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};