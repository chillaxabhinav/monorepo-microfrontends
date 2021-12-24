module.exports = (node) => {
    const isDevelopment = process.env.NODE_ENV;
    const shouldUseReactRefresh = process.env.REACT_REFRESH
    return {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        '@babel/preset-env',
                        [
                            "@babel/preset-react",
                            {
                                "runtime": "automatic"
                            }
                        ],
                        "@emotion/babel-preset-css-prop",
                        "@babel/preset-typescript"
                    ],
                    plugins: [
                            '@loadable/babel-plugin',
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    "regenerator": true
                                }
                            ],
                            'babel-plugin-twin',
                            'babel-plugin-macros',
                            shouldUseReactRefresh && isDevelopment && !node && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                }
            }
        ]
    }
}
