//数据有效期在7天
const EX = 7 * 24 * 3600 

module.exports = async (key, value) => await new Promise((resolve, reject)=>{
    if(typeof value == 'object') {
        value = JSON.stringify(value)
    }
    global.redisServer.set(key, value, 'EX', EX, (err, reply)=>{
        if(err) {
            reject(false)
        }else {
            resolve(true)
        }
    })
})