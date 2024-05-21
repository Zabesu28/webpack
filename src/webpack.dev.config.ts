import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {
    Configuration as WebpackConfig,
    HotModuleReplacementPlugin,
} from 'webpack'
import {
    Configuration as WebpackDevServerConfig
} from 'webpack-dev-server'

type Configuration = WebpackConfig & {
    devServer?: WebpackDevServerConfig;
}

const config:Configuration = {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    entry: './index.tsx',
    module: {
        rules: [
            {
                test:/\.(ts|js)x?$/i,
                exclude: /node-modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static:path.join(__dirname, 'dist'),
        historyApiFallback:true,
        port:4000,
        open:true,
        hot:true,
    }
}
export default config