var deleteTask = require('DELETE')

function deleteForever(event) {
    let tasks = taskList.querySelectorAll('li')
    let currentTask = event.currentTarget.parentElement
    currentTask.innerHTML += '*'
    for( let i = 0 ; i < tasks.length ; i++) {
        if(tasks[i].innerHTML === currentTask.innerHTML) {
            tasks[i].innerHTML = tasks[i].innerHTML.replace('*', '')
            var currentIndex = i
        }
    }
    deleteTask('localhost:3000/todolist', currentIndex, response =>{
        tasks[currentIndex].remove()
        console.log(response.responseText)
    })
}