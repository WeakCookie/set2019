var http = require('http')
var fs = require('fs')

//thử nghiệm nếu có sẵn 4 task như sau
var taskList = []

function getResources(req,res) {
    if(req.url == '/' || req.url == '/all' || req.url == '/done' || req.url == '/undone') {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream(__dirname + '/index.html').pipe(res)
    }
    if(req.url ==='/style.css' ) {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.createReadStream(__dirname + '/style.css').pipe(res)
    }
    if (req.url === '/script.js') {
        res.writeHead(200,{'Content-Type':'text/js'})
        fs.createReadStream(__dirname + '/script.js').pipe(res)
    }
    if(req.url ==='/api/taskList') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(taskList))
    }
}

http.createServer((req,res) => {
    getResources(req,res)
    if(req.url === '/add-task') {
        req.on('data', reqData => {
            const newTask = { taskName: JSON.parse(reqData.toString()), checked: false }
            taskList.push(newTask)
            res.end(JSON.stringify(newTask))
        })
    }
    if(req.url === '/delete') {
        req.on('data', result => {
            currentIndex = JSON.parse(result.toString())
            taskList.splice(currentIndex,1)
            res.end()
    })
    }
    if(req.url === '/checkTask') {
        let index = 0
        req.on('data', result => {
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
          res.writeHead(200,{'Content-Type':'text/plain'})
          res.end(JSON.stringify(taskList))
        })
    }
    if(req.url === '/all') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(taskList))
    }
    if(req.url === '/done') {
        let doneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === true) {
                doneTasks.push(taskList[i])
            }
        }
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(doneTasks))
    }
    if(req.url === '/undone') {
        let undoneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === false) {
                undoneTasks.push(taskList[i])
            }
        }
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(undoneTasks))
    }

}).listen(3000)

console.log('Sever is now running on http://localhost:3000')