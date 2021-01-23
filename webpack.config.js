const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, args) => {
  const { mode } = args
  const sourceMap = mode === 'development'

  return {
    mode,
    devtool: sourceMap && 'source-map',
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          enforce: 'pre',
          test: /\.css$/,
          loader: 'typed-css-modules-loader'
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap,
                importLoaders: 2,
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap,
                postcssOptions: {
                  plugins: [['autoprefixer', { grid: true }]]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
      alias: {
        components: path.join(__dirname, 'src', 'components')
      }
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
      open: 'chrome',
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
      })
    ]
  }
}
