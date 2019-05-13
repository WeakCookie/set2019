function addTask(method, url, task) {
    if (method == "POST" && url == "localhost:3000/todolist") {  
        var data = {}
        data.name = response.name
        data.done = false
        task.push(data)
    }
    return task
}

module.exports = addTask