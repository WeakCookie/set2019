http = require('http')
fs = require('fs')
port = 3000
url = 'http://localhost:'

let server = http.createServer((req, res) => {
    const {method, url} = req
    if(req.url === '/') {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream('../src/pages/loginPage/index.html').pipe(res)
    }
    else if(req.url ==='/style.css') {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.createReadStream('../src/pages/loginPage/style.css').pipe(res)
    }
    if (url == '/home') {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream('../src/pages/ToDoList/todolist.html').pipe(res)
    }
    if (url == '/todolist.css') {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.createReadStream('../src/pages/ToDoList/todolist.css').pipe(res)
    }
    if (url == '/todolist.mp4') {
        res.writeHead(200,{'Content-Type':'video/mp4'})
        fs.createReadStream('./assets/videos/todolist.mp4').pipe(res)
    }
})
server.listen(3000)
console.log('server is now running on ' + url + port)
