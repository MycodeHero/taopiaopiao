const webpack = require('webpack')
const koa = require('koa')
const path = require('path')
const fs = require('fs')
const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware')
const route = require('koa-route')
const config = require('../webpack.dev.js')
const compiler = webpack(config)
const port = 3000
const app = new koa()


app.use(devMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  lazy: true,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },
  publicPath: '/',
  stats: {
    colors: true
  }
}))

app.use(hotMiddleware(compiler))

const moveDetail = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'moveDetails.json'))
}
app.use(route.get('/moveDetails', moveDetail))


const queryAdvertise = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'queryadvertise.json'))
}
app.use(route.get('/queryadvertise', queryAdvertise))

app.listen(port, function (error) {
    if(error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)        
    }
})
