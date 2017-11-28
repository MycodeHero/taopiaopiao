var webpack = require('webpack')
var path = require('path')
var express = require('express')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.dev.js')
var fs = require('fs')
var port = 3000
var app = new express ()
var compiler = webpack(config)


app.use(webpackDevMiddleware(compiler, {
    info: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}))

app.use(webpackHotMiddleware(compiler))

app.get('/moveDetails', function (req, res) {
   fs.readFile(path.resolve(__dirname, 'moveDetails.json'), 'utf-8', function (err, data) {
       if(err) {
           throw err
       }
       var data = JSON.parse(data)
       res.json(data)
   })
})

app.get('/queryadvertise', function (req, res) {
    fs.readFile(path.resolve(__dirname, 'queryadvertise.json'), 'utf-8', function(err, data) {
        if(err) {
            throw err
        }
        var data = JSON.parse(data)
        res.json(data)
    })
})
app.listen(port, function (error) {
    if(error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)        
    }
})
