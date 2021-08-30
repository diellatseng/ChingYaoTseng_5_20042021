const path = require('path');

module.exports = {
  mode: "development", //OR production
  entry: {
    index: "./src/index.js",
    pageProduct: './src/product.js',
    pageCart: './src/cart.js',
    pageThankyou: './src/thankyou.js',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js")
  }
};