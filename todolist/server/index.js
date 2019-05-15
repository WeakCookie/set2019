http = require('http')
fs = require('fs')
readStream = require('./utils/readStream.js')
login = require('./controllers/login.js')
port = 3000
url = 'http://localhost:'

usersList = {hieu:'1234'}
tokensList = {hieu:'123'}
tasksList = [
    {name:'wash dish', done:false},
    {name:'clean', done:false}
]

let server = http.createServer((request, response) => {
    const { method,url } = request

    if(url == '/todolist') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('../src/pages/ToDoList/todolist.html', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/todolist.css') {
        response.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('../src/pages/ToDoList/todolist.css', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/api/renderList.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'})
        fs.readFile('../src/api/renderList.js', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/renderList' && method == 'GET') {
        response.end(JSON.stringify(tasksList))
    }

    if(url == '/assets/videos/instruction.mp4') {
        response.writeHead(200, {'Content-Type': 'video/mp4'})
        fs.readFile('../assets/videos/instruction.mp4', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/api/API-Login.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'})
        fs.readFile('../src/api/API-Login.js', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/utils/POST.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'})
        fs.readFile('../src/utils/POST.js', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/utils/GET.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'})
        fs.readFile('../src/utils/GET.js', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/login') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('../src/pages/loginPage/index.html', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/login.css') {
        response.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('../src/pages/loginPage/login.css', null, (error,data) => {
            response.end(data)
        })
    }

    if(url == '/login' && method == 'POST') {
        readStream(request, content => {
            login(content, usersList, tokensList, data => {
                response.end(JSON.stringify(data))
            })
        })
    }

})
server.listen(port)

console.log('server is now running on ' + url + port)
