var http = require('http')
var fileReader = require('fs')
let port = 3000
let host = '127.0.0.1'
let pageDirectory = './src'
let currentPage = '/todolist'
let fileType = {
    'css' : 'text/css',
    'mp4' : 'video/mp4',
    'js'  : 'application/javascript',
    'html': 'text/html'
 }
 function getCharOcurrence (aString, character) {
    let length = aString.length
    let result = 0
    for (var i = 0;i < length;i++){
        if (aString[i] == character) {
            result = result + 1
        }
    }
    return result
 }
function isPageFile(path) {
    let pathChecker = getCharOcurrence(path, '/')
    if(pathChecker == 1){
        return true
    }
    return false
}
function getFileExtension (path) {
    let directory = path.split('/')
    let file = directory[directory.length - 1]
    let fileSplitter = file.split('.')
    let fileExtension = fileSplitter[1]
    return fileExtension
}
let server = http.createServer((request, response) => {
    const {method, url} = request
    let pathToFile = url
    let fileDirectory = '.'
    let htmlExtension = '.html'
    if (isPageFile(pathToFile)) {
        debugger
        let fileExtension = getFileExtension(pathToFile)
        if (fileExtension == undefined){
            response.setHeader('content-type', fileType.html)
        } else {
            htmlExtension = ''
            response.setHeader('content-type', fileType[fileExtension])
        }
        fileReader.readFile(pageDirectory + currentPage + pathToFile + htmlExtension, null, (error, data) => {
            if (error) {
                throw error
            }
            console.log(pageDirectory + pathToFile + pathToFile)
            response.write(data)
            response.end()
        })
    } else {
        fileReader.readFile(fileDirectory + pathToFile, null, (error, data) => {
            console.log (pathToFile)
            let fileExtension = getFileExtension(pathToFile)
            response.setHeader('content-type', fileType[fileExtension])
            if(error) {
                throw error
            }
            response.write(data)
            response.end()
        })
    }
})

server.listen(port, host, ()=> {
    console.log ('server is running')
})
