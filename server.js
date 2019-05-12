var http = require('http')
var fileReader = require('fs')
let port = 3000
let host = '127.0.0.1'
let pageDirectory = '.'
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
    let outputFiles
     if (isPageFile(pathToFile)) {
        outputFiles = fileDirectory + pathToFile + '/index.html'
    } else {
        outputFiles = fileDirectory + pathToFile
    }
    let fileExtension = getFileExtension(outputFiles)
    fileReader.readFile(outputFiles, null, (error, data) => {
        response.statusCode = 200
        response.setHeader('content-type', fileType[fileExtension])
        response.write(data)
        response.end()
    })
    
})

server.listen(port, host, ()=> {
    console.log ('server is running')
})
