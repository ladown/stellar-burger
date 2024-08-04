const HTMLWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: production
      ? 'static/scripts/[name].[contenthash].js'
      : 'static/scripts/[name].js',
    publicPath: 'auto',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                auto: /\.module\.\w+$/i
              },
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.svg',
      '.jpg'
    ],
    alias: {
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@ui': path.resolve(__dirname, '../src/components/ui'),
      '@ui-pages': path.resolve(__dirname, '../src/components/ui/pages'),
      '@utils': path.resolve(__dirname, '../src/utils/'),
      '@utils-types': path.resolve(__dirname, '../src/utils/types'),
      '@api': path.resolve(__dirname, '../src/utils/burger-api.ts'),
      '@services': path.resolve(__dirname, '../src/services/'),
      '@slices': path.resolve(__dirname, '../src/services/slices'),
      '@store': path.resolve(__dirname, '../src/services/store.ts'),
      '@hooks': path.resolve(__dirname, '../src/hooks')
    }
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, '..', './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: production
        ? 'static/styles/[name].[contenthash].css'
        : 'static/styles/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/!(index.html)'),
          context: path.resolve(__dirname, '../public/'),
          noErrorOnMissing: true
        }
      ]
    }),
    new Dotenv()
  ]
};
