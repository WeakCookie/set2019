var countDone = 0
var countUndone = 0

function getTaskList () {
    var list = document.getElementById('task-list')
    const http = new XMLHttpRequest()
    const url = 'http://localhost:3000/getlist'
    var add = document.getElementById('header-taskname')
    http.open('GET', url)
    http.send()
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var task = JSON.parse(http.responseText)
            task.push(add.value.trim())
            for (var count = 0; count < task.length; count++) {
                var item = document.createElement('li')
                item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)"/>' + task[count].trim() + '</label>'
                item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
                item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
                list.append(item)
            }
        }
    }
}

function deleteAttention() {
    var checkBorder = document.getElementById('header-taskname')
    if (document.getElementById('valid').style.display == 'block') {
        document.getElementById('valid').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

function add() {
    var valid = document.getElementById('valid')
    var check = document.getElementById('header-taskname')
    if (check.value.trim() != '') {
        countTask++
        countUndone++
        var taskList = document.getElementById('task-list')
        var add = document.getElementById('header-taskname')
        var item = document.createElement('li')
        item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)"/>' + add.value.trim() + '</label>'
        item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        valid.innerHTML += 'this field is mandatory!!'
        taskList.append(item)
    }
}

function validate() {
    var checkValidate = document.getElementById('header-taskname')
    var valid = document.getElementById('valid')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid').style.display = 'block'
        valid.innerHTML += 'this field is mandatory!!'
    }
}
