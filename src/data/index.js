const {readFileSync} = require('fs')

module.exports = {
    leerJSON : (filename) => {
        return JSON.parse(readFileSync(`./data/${filename}.json`,'utf-8'))
    }
}