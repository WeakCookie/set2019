function add() {
    var check = document.getElementById('header-taskname')
    if (check.value.trim() != '') {
        var add = document.getElementById('header-taskname')
        var item = document.createElement('li')
        var currentValue = add.value.trim()
        item.innerHTML += '<label><input type="checkbox" onclick="checkTask(event)"/>' + currentValue + '</label>'
        item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        taskList.append(item)
        console.log(item)
    }
    else {
        console.log('failed')
    }
    
}

function requestAdd (currentValue, url) {
    let requestAdd = new XMLHttpRequest()
    requestAdd.open('POST', url)
    requestAdd.send(JSON.stringify(currentValue))
    requestAdd.onload = function() {
        if (this.status == 200) {
            var data = document.getElementById('header-taskname').value
            console.log('Add successfully!')
            add(data)
            data = ''
        }
    }
}