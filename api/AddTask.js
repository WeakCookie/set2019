var post = require ('POST')

function addTask() {
    var check = document.getElementById('header-taskname')
    if (check.value.trim() != '') {
        var add = document.getElementById('header-taskname')
        var item = document.createElement('li')
        var currentValue = add.value.trim()
        item.innerHTML += '<label><input type="checkbox" onclick="checkTask(event)"/>' + currentValue + '</label>'
        item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        taskList.append(item)
        var data = {
            name : check,
            done : false
        }
        post ("localhost:3000/todolist", data, response => {
            console.log(response.responseText)
        })
    }
    else {
        console.log('failed')
    }
}

module.exports = addTask