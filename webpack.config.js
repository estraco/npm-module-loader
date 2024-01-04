// eslint-disable-next-line no-undef
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    entry: require('path').join(__dirname, 'build', 'index.js'),

    // webpack needs to bundle index.js into a module that can be required
    // from the tar module.  This is the path to the tar module.
    output: {
        // eslint-disable-next-line no-undef
        path: __dirname,
        filename: 'npm.js',
        libraryTarget: 'commonjs2'
    },

    // compiles for node.js
    target: 'node'
};