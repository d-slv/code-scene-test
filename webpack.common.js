const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ['regenerator-runtime/runtime', './src/main/index.tsx'],
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'index.js',
		publicPath: '/',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			presentation: path.resolve(__dirname, 'src', 'presentation'),
			main: path.resolve(__dirname, 'src', 'main'),
			domain: path.resolve(__dirname, 'src', 'domain'),
			data: path.resolve(__dirname, 'src', 'data'),
			infra: path.resolve(__dirname, 'src', 'infra'),
			tests: path.resolve(__dirname, 'src', 'tests'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
					name: '[sha512:hash:base64:7].[ext]',
				},
				exclude: /node_modules/,
			},
			{
				test: /\.js$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
				exclude: /node_modules/,
			}
		],
	},
	devServer: {
		devMiddleware: {
			writeToDisk: (filePath) => {
        return /^(?!.*(hot)).*/.test(filePath);
      },
		},
		static: {
			directory: './dist',
		},
		historyApiFallback: true,
		port: 8080,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/presentation/assets/images/favicon.ico',
				}
			],
		}),
	],
};
