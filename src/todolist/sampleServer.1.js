let http = require('http')
const hostname = '127.0.0.1'
const port = 3000
let fs = require('fs')
let htmlFile = fs.readFile('./index.html', null, (error, data) => {
    if (error) {
        throw error
    }
    htmlFile = data
})
let cssFile = fs.readFile('./todolist-stye.css', null, (error, data) => {
    if (error) {
        throw error
    }
    cssFile = data
})
server = http.createServer((request, response) => {
    const {method, url} = request
    console.log(url)
    if (url == '/todolist-stye.css'){
        response.writeHead(200, {'Content-Type': 'text/css'})
        response.write(cssFile)
        response.end()
    }
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(htmlFile)
    response.end()
})
server.listen(port, hostname, () => {
    console.log('local server')
})