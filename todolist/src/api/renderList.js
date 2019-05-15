function renderList () {
    let taskList = document.getElementById('task-list')
    getResource('/renderList', data => {
        for( let i = 0 ; i < data.length ; i++) {
            if(data[i].done === false) {
                var item = document.createElement('li')
                item.innerHTML += '<label><input type="checkbox" onclick="checkTask(event)"/>' + data[i].name + '</label>'
                item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
                item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
                taskList.append(item)
            }
            else {
                var item = document.createElement('li')
                item.innerHTML += '<label><input type="checkbox" onclick="checkTask(event)" checked/><strike>'+ data[i].name  +'</strike></label>'
                taskList.append(item)
            }
        }
    })
}

renderList()