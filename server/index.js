http = require('http')
fs = require('fs')
port = 3000
url = 'http://localhost:'
let server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream('../src/pages/loginPage/index.html').pipe(res)
    }
    else if(req.url ==='/style.css') {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.createReadStream('../src/pages/loginPage/style.css').pipe(res)
    }
})
server.listen(3000)
console.log('server is now running on ' + url + port)
