const http = require('http')
const fs = require('fs')
const Router = require('./router')

const port = 3000
const hostName = '127.0.0.1'

let server = http.createServer((request, response) => {
    let router = new Router(request, response)

    router.get('/script.js', 'text/javascript', () => {
        fs.readFile('script.js', 'utf8', (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    router.get('/style.css', 'text/css', () => {
        fs.readFile('style.css', 'utf8', (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    router.get('/login', 'text/html', () => {
        fs.readFile('login.html', null, (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    router.get('/signup', 'text/html', () => {
        fs.readFile('signup.html', null, (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    if(!router.found) {
        response.end('page not found')
    }
})

server.listen(port, hostName, () => {
    console.log(`Server published at ${hostName}:${port}`)
})