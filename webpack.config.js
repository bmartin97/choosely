const path = require('path');

module.exports = (env, argv) => {
    switch (argv.mode) {
        case 'production':
            return {
                mode: 'production',
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'choosely.min.js',
                    libraryTarget: 'commonjs2'
                },
                module: {
                    rules: [
                        {
                            test: /\.js?$/,
                            exclude: /(node_modules)/,
                            use: 'babel-loader'
                        }
                    ]
                },
                resolve: {
                    extensions: ['.js']
                }
            };
        case 'development':
            return {
                mode: 'development',
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'choosely.dev.js',
                    libraryTarget: 'commonjs2'
                },
                devtool: 'eval-source-map',
                module: {
                    rules: [
                        {
                            test: /\.js?$/,
                            exclude: /(node_modules)/,
                            use: 'babel-loader'
                        }
                    ]
                },
                resolve: {
                    extensions: ['.js']
                }
            };
        default:
            console.log('Missing --mode arg!');
            return;
    }
};
