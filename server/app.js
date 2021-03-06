const koa = require('koa')
const koaPug = require('koa-pug')
const path = require('path')
const fs = require('fs')
const koaRouter = require('koa-router')
const koaBody = require('koa-body')
const static = require('koa-static')
const port = 8080
const app = new koa()
const redis = require('redis')
let client = redis.createClient({
    host: "127.0.0.1",
    port: 6381
})
global.redisServer = client
// const signIn = require('./controller/signIn')
const login = require('./route/login')
const mf = require('./route/movieFile.js')


client.on('ready', function (err) {
    if(err) {
        console.log('[redis run error]')
        return
    }
    console.log('[redis run success]')
})

new koaPug({
  app,
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: './template',
  viewPath: path.join(__dirname, './template')
})

const router = new koaRouter()
// client.on('connect', ()=>{
//     const session = require('../node/controller/session')
// })

router.get('/', login.routes())
router.get('/mf', mf.routes())

app.use(koaBody())
const loginApprove = async (ctx, next) => {
    // signIn(ctx.request.body)
    ctx.response.type= 'json'
    ctx.response.body = await fs.createReadStream(path.resolve(__dirname, 'data/success.json'))
}
router.post('/access', loginApprove)

const appPage = async (ctx, next) => {
    client.set('pages', 0)
    ctx.response.type = 'html'
    ctx.response.body = await fs.createReadStream(path.resolve(__dirname, '../src/index.html'))
}
router.get('/app', appPage)

const queryAdvertise = ctx => {
    ctx.response.type = 'json'
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

