module.exports = (node) => ({
    test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)$/i,
    type: 'asset/resource',
    generator: {
        emit: !node
    }
})
