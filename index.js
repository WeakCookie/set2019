http = require('http')
fs = require('fs')
port = 3000
url = 'http://localhost:'
var task = []
require('./controllers/checkTask.js')

let server = http.createServer((request, response) => {
    const { method, url } = request
    response.end()
})

server.listen(port)