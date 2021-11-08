const path = require('path');

module.exports = {
  entry: './src/import_chrono.js',
  output: {
    filename: 'chronoBundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    library: {
        name: 'chronoBundle',
        type: 'umd',
      },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader', // post process the compiled CSS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
};