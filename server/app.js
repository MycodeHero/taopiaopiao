const koa = require('koa')
const koaPug = require('koa-pug')
const path = require('path')
const fs = require('fs')
const koaRouter = require('koa-router')
const static = require('koa-static')
const port = 9000
const app = new koa()
const login = require('./route/login')

new koaPug({
  app,
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: './template',
  viewPath: path.join(__dirname, './template')
})

const router = new koaRouter()


router.get('/', login.routes())

const moveDetail = ctx => {
  ctx.response.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'data/moveDetails.json'))
}
router.get('/moveDetails', moveDetail)


const queryAdvertise = ctx => {
  ctx.resonse.type = 'json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'data/queryadvertise.json'))
}
router.get('/queryadvertise', queryAdvertise)
app.use(static(__dirname, '../src/'))
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, function (error) {
    if(error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)        
    }
})
