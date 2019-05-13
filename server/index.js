http = require('http')
fs = require('fs')
port = 3000
url = 'http://localhost:'
let server = http.createServer((request, response) => {
    const { method,url } = request
    response.end()
})
server.listen(port)

console.log('server is now running on ' + url + port)
