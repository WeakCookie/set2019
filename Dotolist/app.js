const http = require('http')
const fs = require('fs')
const Router = require('./router')

const port = 3000
const hostName = '127.0.0.1'

let tasks = []

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

    router.get('/todolist', 'text/html', () => {
        fs.readFile('index.html', null, (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    router.post('/todolist', data => {
        for(let i = 0; i < tasks.length; i++ ) {
            if(tasks[i].name == data.originalName) {
                tasks[i].name = data.replaceName
                response.end('success')
            }
        }
        response.end('task not found on the server')
    })

})

server.listen(port, hostName, () => {
    console.log(`Server published at ${hostName}:${port}`)
})