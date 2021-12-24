/*

This babel config is purely for jest use and for nothing else
webpack has its own babel config inside its configuration that helps in bundling

*/

module.exports = {
    presets: [
        '@babel/preset-env',
		[
            '@babel/preset-react',
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
        'babel-plugin-macros'
    ]
}
