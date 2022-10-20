const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        index: '../client/src/index.js',
        Displayer: '../client/src/Displayer.js'
    },
    output: {
        path: path.resolve(__dirname, '/client/sdist/bundles'),
        filename: '[name].bundle.js'
    },
    watch: true,    

};