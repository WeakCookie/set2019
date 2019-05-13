function deleteItem(event) { 
    var item = event.currentTarget.parentElement  
    if( document.getElementById('save-edit').style.display == 'block') {  
        alert.popWarning("Please input somthing")
    }
    else {
        item.innerHTML = item.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>', '') 
        item.innerHTML = item.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>', '')  
        item.innerHTML += '<button class="no-button" onclick="deleteFake(event)">No</button>' 
        item.innerHTML += '<button class="yes-button" onclick="deleteForever(event)">Yes</button>' 
    }
}

function deleteFake(event) { 
    var item = event.currentTarget.parentElement
    event.currentTarget.remove()  
    item.innerHTML = item.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>','') 
    item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
    item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'   
} 

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
    requestDelete (currentIndex)
}

function requestDelete (currentIndex) {
    let reqDelete = new XMLHttpRequest()
    reqDelete.open('DELETE','http://localhost:3000/delete') 
    reqDelete.send('' + currentIndex)
    reqDelete.onload = function() {
        if (this.status == 200){
            alert.popSuccess('Delete successfully!')
            let tasks = taskList.querySelectorAll('li')
            tasks[currentIndex].remove() 
        }
    }
    reqDelete.onerror = function() {
        alert.popError('failed')
    }
}
