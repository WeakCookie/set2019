function addTask() {
    var check = document.getElementById('taskname')
    if (check.value.trim() != '') {
        var data = {
            name : check.value,
            done : false
        }

        postResource("http://localhost:3000/todolist", data, validate => {
            if(validate) {
                let taskList = document.getElementById('task-list')
                var item = document.createElement('li')
                var currentValue = check.value.trim()
                item.innerHTML += '<label><input type="checkbox" onclick="checkTask(event)"/>' + currentValue + '</label>'
                item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
                item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
                taskList.append(item)
                check.value = ''
            }
        })
    }
    else {
        alert('task name should be filled')
    }
}