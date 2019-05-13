currentPage = ''
var taskList = document.getElementById('task-list')
var request = new XMLHttpRequest()
//khi mới load trang thì tạo request để load những task đã được lưu trên server
request.open('GET','http://localhost:3000/api/taskList')
request.send()
request.onload = function() {
    data = JSON.parse(request.responseText)
    loadAvailableTasks(data)
}

request.onerror = function() {
    alert.popError('failed')
}


function loadAvailableTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
        if(data[i].checked === false) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()"/>' + data[i].taskName + '</label>'
            item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
            item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
            taskList.append(item)
        }
        else {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()" checked/><strike>'+ data[i].taskName  +'</strike></label>'
            taskList.append(item)
        }
    }
}

function loadUndoneTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
        if(data[i].checked === false) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()"/>' + data[i].taskName + '</label>'
            item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
            item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
            taskList.append(item)
        }
    }
}

function loadDoneTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
       if(data[i].checked === true) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()" checked/><strike>'+ data[i].taskName  +'</strike></label>'
            taskList.append(item)
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
    var check = document.getElementById('header-taskname')
    if (check.value.trim() != '') {
        var taskList = document.getElementById('task-list')
        var add = document.getElementById('header-taskname')
        var item = document.createElement('li')
        var currentValue = add.value.trim()
        item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)"/>' + currentValue + '</label>'
        item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        taskList.append(item)
        alert.popSuccess('Add successfully!')
        changeBackgroundColorTask(item)
        check.setAttribute('class','animation-input')
        alert.popSuccess("Add successfully!!")
    }
    requestAdd(currentValue)
}

function requestAdd (currentValue) {
    let reqAdd = new XMLHttpRequest()
    reqAdd.open('POST','http://localhost:3000/add-task')
    reqAdd.send(JSON.stringify(currentValue))
    reqAdd.onload = function() {
        alert.popSuccess('Add successfully!')
    }
    reqAdd.onerror = function() {
        alert.popError('failed')
    }
}

function validate() {
    var checkValidate = document.getElementById('header-taskname')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid').style.display = 'block'
        alert.popWarning("Please input somthing")
    }
}

function deleteAttention() {
    var checkBorder = document.getElementById('header-taskname')
    if (document.getElementById('valid').style.display == 'block') {
        document.getElementById('valid').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

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
    reqDelete.open('POST','http://localhost:3000/delete') 
    reqDelete.send('' + currentIndex)
    reqDelete.onload = function() {
        deleteAnimation(currentIndex)
        alert.popSuccess('Delete successfully!')
    }
    reqDelete.onerror = function() {
        alert.popError('failed')
    }
}

function deleteAnimation(currentIndex) {
    let tasks = taskList.querySelectorAll('li')
    setTimeout(() => {
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].className = 'movingUp'
            }
        }
    }, 0);
    setTimeout(() => {
        tasks[currentIndex].remove()
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].removeAttribute('class')
            }
        }
    }, 1000);
    setTimeout(() => {
        tasks[currentIndex].className = 'fadeOut'
    }, 0);
}

function checkTask() {
    let taskCheckBoxs = taskList.querySelectorAll('input')
    let checkedTasks = []
    for( let i = 0 ; i < taskCheckBoxs.length ; i++) {
        if(taskCheckBoxs[i].checked === true) {
            checkedTasks.push(i)
        }
    }
    requestCheck(checkedTasks)
}

function requestCheck(checkedTasks) {
    let reqCheck= new XMLHttpRequest()
    reqCheck.open('POST','http://localhost:3000/checkTask') 
    reqCheck.send(JSON.stringify(checkedTasks))
    reqCheck.onload = function() {
        data = JSON.parse(reqCheck.responseText)
        taskList.innerHTML =""
        loadAvailableTasks(data)
        alert.popSuccess('Check successfully!')
    }
    reqCheck.onerror = function() {
        alert.popError('failed')
    }
}

function dropDown() {
    document.getElementById("dropdown-list").classList.toggle("show");
}

function allShow() {
    currentPage = 'all'
    let reqAll = new XMLHttpRequest()
    reqAll.open('GET','http://localhost:3000/all')
    reqAll.send()
    reqAll.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqAll.responseText)
        loadAvailableTasks(data)
    }
    reqAll.onerror = function() {
        alert.popError('failed')
    }
}

function doneShow() {
    currentPage = 'done'
    let reqDone = new XMLHttpRequest()
    reqDone.open('GET','http://localhost:3000/done')
    reqDone.send()
    reqDone.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqDone.responseText)
        loadAvailableTasks(data)
    }
    reqDone.onerror = function() {
        alert.popError('failed')
    }
}

function undoneShow() {
    currentPage = 'undone'
    let reqUndone = new XMLHttpRequest()
    reqUndone.open('GET','http://localhost:3000/undone')
    reqUndone.send()
    reqUndone.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqUndone.responseText)
        loadAvailableTasks(data)
    }
    reqUndone.onerror = function() {
        alert.popError('failed')
    }
}


// **********************************************************************************************************
//alert class
class Alert {
    constructor (position,timeout,hasDisableClick,isStacked)
    {   
        this.timeout = timeout
        this.isStacked = isStacked
        this.positions = position.split('-')
        this.hasDisableClick = hasDisableClick
    }
   
    popSuccess(str) {
        var div = document.createElement('div')
        div.className = "alert-success"
        div.id = "popUp"
        var currentPosition ='top'
        div.innerHTML += '<i class="fas fa-check-circle"></i>'
        for (var i in this.positions) {
            if (this.positions[i]==='right') {
                div.style.left = "77%"
            }
            if (this.positions[i]==='left') {
                div.style.left = "2%"
            }
            if (this.positions[i]==='center') {
                div.style.left = "40%"
            }
            if (this.positions[i]==='bottom') {
                div.style.top = "73vh"
                currentPosition = 'bottom'
            }
        }
        popsitionModifier.bind(this)(currentPosition);
        if (this.hasDisableClick) {
           div.innerHTML += '<i class="fas fa-times" id="close-button" onclick="disable(event)"></i>'
        }
       
        div.innerHTML+= "<h3>"+ str +"</h3>"
        document.getElementById('pop-up').appendChild(div)
        setTimeout (function() {
            div.style.animationName = "fadeOut" 
        },this.timeout)
        setTimeout (function() {
            div.remove(); 
        },this.timeout + 1000)
    }

   popError(str) {
    var div = document.createElement('div')
    div.className = "alert-error"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-times-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left =  "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
   }

   popInfo(str) {
    var div = document.createElement('div')
    div.className = "alert-info"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-info-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left = "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
   }

   popWarning(str) {
    var div = document.createElement('div')
    div.className = "alert-warning"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-exclamation-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left = "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
    
   }
}

function popsitionModifier(position) {
var pops = document.querySelectorAll("#popUp")
  if(position === 'top') {
    if (this.isStacked) {
        for (var j = pops.length-1; j >= 0; j--) {
            var countNumberOfPops = pops.length - j + 1;
            pops[j].style.top =  (countNumberOfPops-1)*13 + "vh"
            pops[j].style.animation = "moveDown 1s forwards"
        }
    }
    else {
        for (var j = pops.length-1; j >= 0; j--) {
            pops[j].remove(); 
        }
    }
  }
  if(position === 'bottom') {
    if (this.isStacked) {
        for (var j = pops.length-1; j >= 0; j--) {
            var countNumberOfPops = pops.length - j + 1;
            pops[j].style.top =  73 - (countNumberOfPops-1)*13 + "vh"
            pops[j].style.animation = "moveUp 1s forwards"
        }
    }
    else {
        for (var j = pops.length-1; j >= 0; j--) {
            pops[j].remove(); 
        }
    }
  }
}

function disable(event) {
   var ChosenPop = event.currentTarget.parentElement
   ChosenPop.remove();
}

let alert = new Alert('bottom-right',5000,true,false)