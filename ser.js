const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./cfg/dev');
const OpenBrowser = require('open-browser-webpack-plugin');

let port = 9000;

console.log(process.argv);

let args = process.argv;

if(args[args.length-1]==='open'){
    config.plugins.push(new OpenBrowser({url : `http://localhost:${port}`}));
}


config.entry.unshift(
    `webpack-dev-server/client?http://192.168.0.8:${port}`,
    'webpack/hot/dev-server'
);

const compiler = webpack(config);

new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './src/' ,
    publicPath: '/assets/' ,
    host: "192.168.0.8" ,
    stats:{colors: true} ,
    overlay: true,
    headers: { "X-Custom-Header": "yes" }
})
.listen(port, e=>{
    console.log(port);
})
