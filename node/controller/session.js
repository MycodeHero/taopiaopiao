const getRedis = require('../util/getRedis')
const setRedis = require('../util/saveRedis')

getRedis("name").then(()=>{
    console.log(111)
}).catch((e)=>{
    console.log(e)
})