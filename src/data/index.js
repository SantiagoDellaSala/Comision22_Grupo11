const {readFileSync, writeFileSync} = require('fs')

module.exports = {
    leerJSON : (filename) => {
        return JSON.parse(readFileSync(`./data/${filename}.json`,'utf-8'))
    },
   escribirJSON: (data, filename)=>{
    writeFileSync(`./data/${filename}.json`, JSON.stringify(data,null,3), 'utf-8')
    return null
   } 
}