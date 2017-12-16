const router = new (require('koa-router'))()
const loginRouter = require('../page/login.js')

router.get('/', loginRouter.login)

module.exports = router