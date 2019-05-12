const http = require('http')
const fs = require('fs')
const Router = require('./router')

const port = 3000
const hostName = '127.0.0.1'
var token = []

function checkLogin(cookie) {
    if (cookie == undefined)
        return false
    else {
        var checkCookie = cookie.replace('token=','')
        return checkToken(checkCookie, token)
    }
}

function checkToken(checkCookie, token) {
    for ( var count = 0; count < token.length; count ++)
        if (checkCookie == token[count])
            return true
    return false
}

let server = http.createServer((request, response) => {
    let router = new Router(request, response)

    router.getResources('/script.js', () => {
        fs.readFile('script.js', 'utf8', (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })

    router.getResources('/style.css', () => {
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
        if (checkLogin(request.headers.cookie))
            readToDoList()  
        else {
            response.writeHead(302, { Location : "http://localhost:3000/login"})
            response.end();
        }
    })

    router.get('/', 'text/html', () => {
        if (checkLogin(request.headers.cookie))
            readToDoList()  
        else {
            response.writeHead(302, { Location : "http://localhost:3000/login"})
            response.end();
        }
    })
})

function readToDoList() {
    fs.readFile('todolist.html', null, (error, data) => {
        if(error) {throw error}
        response.end(data)
    })
}

server.listen(port, hostName, () => {
    console.log(`Server published at ${hostName}:${port}`)
})