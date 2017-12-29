const router = new ((require('koa-router')))()
const pageQuery = require('../controller/pageQuery')
const fs = require('fs')
const path = require('path')

const movieFile = async ctx => {
    var result = await pageQuery(ctx.query, 'movieFile')
    ctx.response.type = 'json'
    ctx.response.body = result
}
router.get('/mf', movieFile)

module.exports = router