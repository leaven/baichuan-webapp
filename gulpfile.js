var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var cleanDest = require('gulp-clean-dest');
var config = require('./webpack.config.js');

gulp.task("dev", ['clean'], function(callback) {
     // gulp.src("public/**").pipe(cleanDest("public"));
    // Start a webpack-dev-server
    
    var compiler = webpack(config);
    var serverConfig = {
        contentBase: '../public', // 把此目录座位网站根目录
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true
        },
        proxy: [{
            path: /\/?/,
            target: 'http://localhost:8080',
            secure: false,
            changeOrigin: true,
            rewrite: function (req) {
              console.log("proxy origin:"+req.url);
              req.url = "/page/index.html";
              console.log("proxy target:"+req.url);
            }
        }]
    };
    new WebpackDevServer(compiler, serverConfig).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        callback();
    });
});
gulp.task("webpack", ['clean'], function(callback) {
    
    webpack(config, function(err, stat) {
        if(err) {
            console.log(err);
        }
        callback();
    });

});
gulp.task("clean", function(callback) {
    return gulp.src("../public/**").pipe(cleanDest("../public"));
} )