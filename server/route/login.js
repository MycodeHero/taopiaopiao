const router = new (require('koa-router'))()
const loginRouter = require('../page/login.js')

router.get('/login', loginRouter.login)

module.exports = router