const {readFileSync} = require('fs')


module.exports = {
    buscarJSON : (filename) => {
        const filePath = path.join(__dirname, `./data/${filename}.json`)
        return filePath
    },
    leerJSON : (filePath) => {
        return JSON.parse(readFileSync(filePath, 'utf-8'));
    },
    escribirJSON : (filePath, array) => {
        return fs.writeFileSync(filePath, JSON.stringify(array), 'utf-8')
    }
}