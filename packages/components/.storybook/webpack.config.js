const babel_loaderConfig = require('@ixigo/meteor/webpack/loaders/babel_loader.config')(false);

module.exports = ({config}) => {
    config.module.rules.push(
            {
                test: /\.(ts|tsx)$/,
                use:[
                    {
                        loader: require.resolve('@storybook/source-loader'),
                        options: {
                            prettierConfig: {
                                printWidth: 100,
                                singleQuote: false,
                            },
                        },
                    }
                ],
            }
    ),
    config.module.rules.push(babel_loaderConfig),
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};