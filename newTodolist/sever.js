const http = require('http')
const url = require('url')
const hostname = '127.0.0.1'
const port = 3000
var fs = require('fs')
var check = 0
const taskList = []
const completedTask = []

function collectDataFromPost(request, callback) {
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        callback(JSON.parse(body))
    })
}

let htmlFile = fs.readFile('./index.html', null, (error, data) => {
    if (error) {
        throw error
    }
    htmlFile = data
})
let cssFile = fs.readFile('./style.css', null, (error, data) => {
    if (error) {
        throw error
    }
    cssFile = data
})
let jsFile = fs.readFile('./script.js', null, (error, data) => {
    if (error) {
        throw error
    }
    jsFile = data
})

var server = http.createServer(function(req, res) {
    console.log(req.url)
    var reqUrl = url.parse(req.url, true)
    if (reqUrl.pathname == '/') {
        console.log(req.url)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(htmlFile)
        res.end()
    }
    else if (reqUrl.pathname == '/add-task') {
        collectDataFromPost(req, result => {
            var taskName = result.taskName
            if (checkValid(taskname)){
                var obj = {}
                obj.taskName = taskName
                taskList.push(obj)
                res.statusCode = 200
                res.setHeader('Content-type','application/json')
                res.write('true')
                res.end();
            }
            else {
                res.statusCode = 200
                res.setHeader('Content-type','application/json')
                res.write('false')
                res.end();
            }
        })
    }
    else if (reqUrl.pathname == '/getlist') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(taskList))
        res.end()
    }
    else if (reqUrl.pathname == '/style.css') {
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.write(cssFile)
        res.end()
    }
    else if (reqUrl.pathname == '/script.js') {
        res.writeHead(200, {'Content-Type': 'text/javascript'})
        res.write(jsFile)
        res.end()
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain')
        res.end('Error')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
})

function checkValid(taskname) {
    if (taskname.value.trim() == '')
        return true
    else
        return false
}
// const server = http.createServer((request, response) => {
//     var reqUrl = url.parse(request.url, true)
//     if(request.headers && request.headers.token == 'abc'){
//         response.statusCode = 200
//         response.setHeader('Content-Type', 'text/plain')
//         response.end('Hello Wolrd\n')
//     }
//     if(reqUrl.pathname == '/todolist'){
//         response.write('Successfully')
//         response.end()
//     }
//     else {
//         response.statusCode = 404;
//         response.setHeader('Content-Type', 'text/plain')
//         response.end('Error')
//     }
// }


function loadSnack() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://127.0.0.1:3000/user-controller/get-products", true);
    http.send();
    var snackList = document.getElementById("main-order");
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            snackListId=0;
            var  snacks = JSON.parse(this.response);
            snacks.forEach(snack => {
                itemPrice.push(snack.price);
                var newSnack = createNewSnack(snack);
                snackList.appendChild(newSnack);
            });
            afterLoad();
        }
        if (this.readyState == 4 && this.status != 200)
            alertError(this.response);
    }
}




