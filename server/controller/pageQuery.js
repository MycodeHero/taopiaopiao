const path = require('path')
const readFile = require('../../node/util/readFS')
const public = path.join(__dirname, '../data', '/')
const pageQuery = async (pageNum,filename) => {
    const path = public + filename + '.json'
    let num = pageNum['pageNum']
    var returnValue = []
    var result  = await readFile(path)
    var handleData = result.data.returnValue
    for(var i = 0; i < num; i++) {
        returnValue.push(handleData[i])
    }
    return ({
        data: {
            returnCode: "0",
            returnValue
        }
    })
}

module.exports = pageQuery