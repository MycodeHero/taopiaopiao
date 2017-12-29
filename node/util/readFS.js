const fs = require('fs')
let readFile =  path => new Promise((resolve, reject)=>{
    fs.readFile(path, (err, data)=>{
        if(err) {
            reject('Error')
            return 
        }
        const result = JSON.parse(data)
        resolve(result)
    })
})
module.exports = readFile