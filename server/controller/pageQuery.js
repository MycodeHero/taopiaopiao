const path = require('path')
const readFile = require('../../node/util/readFS')
const getRedis = require('../../node/util/getRedis')
const saveRedis = require('../../node/util/saveRedis')
const public = path.join(__dirname, '../data', '/')
const pageQuery = async (pageNum,filename) => {
    const path = public + filename + '.json'
    let num = pageNum['pageNum']
    let returnValue = []
    let status = 1
    let result  = await readFile(path)
    let handleData = result.data.returnValue
    let pages = await getRedis('pages')
    let total = Number(pages) + Number(num)
    for(let i = pages; i < total; i++) {
        if(handleData[i] === undefined){
            status = 0
            break
        } 
        returnValue.push(handleData[i])
    }
    saveRedis('pages', total)
    return ({
        data: {
            returnCode: "0",
            returnValue,
            status
        }
    })
}

module.exports = pageQuery