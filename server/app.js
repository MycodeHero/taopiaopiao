const webpack = require('webpack')
const koa = require('koa')
const koaPug = require('koa-pug')
const path = require('path')
const fs = require('fs')
const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware')
const koaRouter = require('koa-router')
const config = require('../webpack.dev.js')
const compiler = webpack(config)
const port = 3000
const app = new koa()
const index = require('./route/login')
const login = require('./api/api')

new koaPug({
  app,
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: './template',
  viewPath: path.join(__dirname, './template')
})

const router = new koaRouter()

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

console.log(login.routes)
router.get('/login', index.routes())
router.get('/view/login.js', login.routes())
app.use(hotMiddleware(compiler))

const moveDetail = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'data/moveDetails.json'))
}
router.get('/moveDetails', moveDetail)


const queryAdvertise = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'data/queryadvertise.json'))
}
router.get('/queryadvertise', queryAdvertise)
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, function (error) {
    if(error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)        
    }
})
