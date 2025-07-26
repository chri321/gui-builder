const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 改为生产模式以提高性能
  entry: './src/webview/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // 只转译，不类型检查，提高编译速度
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/webview/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false, // 暂时关闭 HTML 压缩以避免问题
    }),
  ],
  optimization: {
    minimize: true, // 启用代码压缩
  },
  performance: {
    hints: false, // 关闭性能提示
  },
}; 