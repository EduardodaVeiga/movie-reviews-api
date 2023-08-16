const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './app.js', 
    target: 'node',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'), 
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    }
}