var http = require('http')
var fileReader = require('fs')
let port = 3000
let host = '127.0.0.1'
let pageDirectory = './src'

function isPageFile(path) {
    let pathChecker = path.split('/')
    if(pathChecker.length == 1){
        return false
    }
    return true
}

let server = http.createServer((request, response) => {
    const {method, url} = request
    let pathToFile = url
    let fileDirectory = '.'
    let fileType = {
       'css' : 'text/css',
       
    }
    if (isPageFile(pathToFile)) {
        
        fileReader.readFile(fileDirectory + pathToFile, null, (error, data) => {
            if (error) {
                throw error
            }
            response.write(data)
            response.end()
        })
    } else {
        fileReader.readFile(pageDirectory + + )
    }
})

server.listen(port, host) {
    console.log ('server is running')
}
