const router = new (require('koa-router'))()
const login = require('./resource')
router.get('/view/login.js', login)
module.exports = router