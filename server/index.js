http = require('http')
fs = require('fs')
login = require('./controllers/login.js')
port = 3000
url = 'http://localhost:'

usersList = {hieu:'1234'}
tokensList = {hieu:'123'}

let server = http.createServer((request, response) => {
    const { method,url } = request

    let promise = new Promise ((resolve, reject) => {
        let body = ''
        request.on('data', chunk => {
            body += chunk.toString()
        })
        request.on('end', () => {
            resolve(JSON.parse(body))
        })
    })

    if(url == '/login' && method == 'POST') {
        promise.then(requestContent => {
            login(requestContent, usersList, tokensList, data => {
                response.end(JSON.stringify(data))
            })
        })
    }

var task = []
require('./controllers/addTask.js')

let server = http.createServer((request, response) => {
    const { method, url } = request
    response.end()
})
server.listen(port)

console.log('server is now running on ' + url + port)
