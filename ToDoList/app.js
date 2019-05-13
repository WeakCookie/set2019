const http = require('http')
const fs = require('fs')
const Router = require('./router')

const port = 3000
const hostName = '127.0.0.1'
var token = []

var taskList = []
var obj1 = {
    user: 'Cnam',
    password: 'Cnam'
}
var users = []
users.push(obj1)


function collectDataFromPost(request, response, callback) {
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        callback(response,JSON.parse(body))
    })
}

function checkLogin(cookie) {
    if (cookie == undefined)
        return false
    else {
        return checkToken(cookie,token)
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
    router.getResources('/scriptLogin.js', () => {
        fs.readFile('scriptLogin.js', 'utf8', (error, data) => {
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
    router.get('/api/taskList', 'text/plain', () => {
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end(JSON.stringify(taskList))
    })

    router.get('/login', 'text/html', () => {


        if (checkLogin(request.headers.cookie))
            readToDoList(response)  
        else {   
            fs.readFile('login.html', null, (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
        }

    })

    router.get('/signup', 'text/html', () => {
        fs.readFile('signup.html', null, (error, data) => {
            if(error) {throw error}
            response.end(data)
        })
    })    
    router.getResources('/check', () => {
        collectDataFromPost(request, response, (response, result) => {
            var detect = true
            console.log(result)
            var checkUser = result.user
            var checkPassword = result.password
            for ( var count = 0; count < users.length; count++) {
                var userCheck = users[count].user
                var passwordCheck = users[count].password
                if ((checkUser == userCheck) && (checkPassword == passwordCheck) && (checkPassword!= '') && (checkUser!= '')) {
                    var cookie = Math.random()
                    detect = false
                    token.push(cookie.toString())
                    response.statusCode = 200
                    response.write(cookie.toString())
                    response.end();
                }
             }
             if(detect){
                response.statusCode = 200
                response.setHeader('Content-type','application/json')
                response.write('false')
                response.end();
             }
        }) 
     })
    router.get('/todolist', 'text/html', () => {
        if (checkLogin(request.headers.cookie))
            readToDoList(response)  
        else {
            response.writeHead(302, { Location : "http://localhost:3000/login"})
            response.end();
        }
    })

    router.getResources('/delete', () => {
        request.on('data', result => {     
            currentIndex = JSON.parse(result.toString())
            taskList.splice(currentIndex,1)
            response.end()
          })
    })
    router.getResources('/getStatistic', () => {
        let number = 0
        req.on('data', result => {     
          let checkTaskbox = JSON.parse(result.toString())
          for(let i = 0 ; i < taskList.length; i++) {
            if(i === checkTaskbox[number]) {
                number++
                checkTaskbox.checked = true
            }
            else {
                checkTaskbox.checked = false
            }
          }
          response.writeHead(200,{'Content-Type':'text/plain'})
          response.end(JSON.stringify(getStatistic))
        })
    })
    router.getResources('/undone', () => {
        let undoneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === false) {
                undoneTasks.push(taskList[i])
            }
        }
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end(JSON.stringify(undoneTasks))
    })
    router.getResources('/done', () => {
        let doneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === true) {
                doneTasks.push(taskList[i])
            }
        }
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end(JSON.stringify(doneTasks))
    })
    router.getResources('/all', () => {
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end(JSON.stringify(taskList))
    })
    router.getResources('/add-task', () => {
        request.on('data', reqData => {
            const newTask = { taskName: JSON.parse(reqData.toString()), checked: false }
            taskList.push(newTask)
            response.statusCode = 200
            response.end()
        })
    })
    
    router.getResources('/favicon.ico', () => {
        response.statusCode = 200
        response.end()
    })
    router.getResources('/checkTask', () => {
        let index = 0
        request.on('data', result => {     
          let checkedIndexes = JSON.parse(result.toString())
          for(let i = 0 ; i < taskList.length; i++) {
            if(i === checkedIndexes[index]) {
                index++
                taskList[i].checked = true
            }
            else {
                taskList[i].checked = false
            }
          }
          response.writeHead(200,{'Content-Type':'text/plain'})
          response.end(JSON.stringify(taskList))
        })
    })
    router.get('/', 'text/html', () => {
        if (checkLogin(request.headers.cookie))
            readToDoList(response)  
        else {
            response.writeHead(302, { Location : "http://localhost:3000/login"})
            response.end();
        }
    })
})

function readToDoList(response) {
    fs.readFile('./todolist.html', null, (error, data) => {
        if(error) {throw error}
        response.end(data)
    })
}

server.listen(port, hostName, () => {
    console.log(`Server published at ${hostName}:${port}`)
})