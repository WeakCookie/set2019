//add
var maxHeightBodyList = document.getElementById('body').style.maxHeight
var toDoList = document.getElementById('to-do-list')
var instructionVideo = document.getElementById('instruction-video')
var statistic = document.getElementById('statistic')
var footer = document.getElementById('footer')
function myFunction(x) {
    if (x.matches) { // If media query matches
        var width = window.innerWidth - 20
        var height = (window.innerHeight - 60)/3
        toDoList.style.width = width.toString() + 'px'
        toDoList.style.height = height.toString() + 'px'
        toDoList.style.cssFloat = 'left'
        toDoList.style.margin = '0px 0px 20px 0px'
        instructionVideo.style.width = width.toString() + 'px'
        instructionVideo.style.height = height.toString() + 'px'
        instructionVideo.style.margin = '0px 0px 20px 0px'
        instructionVideo.style.cssFloat = 'left'
        statistic.style.width = width.toString() + 'px'
        statistic.style.height = height.toString() + 'px'
        statistic.style.margin = '0px'
        statistic.style.cssFloat = 'left'
        footer.style.bottom = '0px'
        var maxHeight = height - 70
        if ( maxHeight >= 15) {
            document.getElementById('body').style.maxHeight = maxHeight.toString() + 'px'
        }
        else {
            maxHeight = 15
            document.getElementById('body').style.maxHeight = maxHeight.toString() + 'px'
        }
    } 
    else {
        var width = (window.innerWidth - 30) / 2
        var height = (window.innerHeight - 20)
        var heightRight = height / 2 - 10
        toDoList.style.width = width.toString() + 'px'
        toDoList.style.height = height.toString() + 'px'
        toDoList.style.cssFloat = 'left'
        toDoList.style.margin = '0px 5px 0px 0px'
        instructionVideo.style.width = width.toString() + 'px'
        instructionVideo.style.height = heightRight.toString() + 'px'
        instructionVideo.style.cssFloat = 'right'
        instructionVideo.style.margin = '0px 0px 10px 5px'
        statistic.style.width = width.toString() + 'px'
        statistic.style.height = heightRight.toString() + 'px'
        statistic.style.cssFloat = 'right'
        statistic.style.margin = '10px 0px 0px 5px'
        footer.style.bottom = '70px'
        var maxHeight = height - 100
        document.getElementById('body').style.maxHeight = maxHeight.toString() + 'px'
        

    }
  }
  
var x = window.matchMedia("(max-width: 768px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)

function add() {
    var check = document.getElementById('header-taskname')
    if (check.value.trim() != '') {
        var taskList = document.getElementById('task-list')
        var add = document.getElementById('header-taskname')
        var item = document.createElement('li')
        item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)"/>' + add.value.trim() + '</label>'
        item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        taskList.append(item)
        document.getElementById('header-taskname').value = ''
        statisticCounter()
    }
} 

function validate() {
    var checkValidate = document.getElementById('header-taskname')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid').style.display = 'block'
        document.getElementById('valid').innerText = '*this field is madatory'
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
    if (document.getElementById('valid').style.display == 'block'|| document.getElementById('valid-edit').style.display == 'block') {
        document.getElementById('valid').style.display = 'none'
        document.getElementById('valid-edit').style.display = 'none'
    }
    var item = event.currentTarget.parentElement
    var nodeFirst = item.childNodes[0]
    var nodeSecond = nodeFirst.childNodes[0]
    if (nodeSecond.checked == true) {
       item.innerHTML = item.innerHTML.replace('<label><input type="checkbox onclick="disabledButton(event)">','<label><input type="checkbox" checked="true">')
    }
    item.innerHTML = item.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>','')
    item.innerHTML = item.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>','')
    item.innerHTML+='<button class="no-button" onclick="deleteFake(event)">No</button>'
    item.innerHTML+='<button class="yes-button" onclick="deleteForever(event)">Yes</button>'
}

function deleteForever(event) {
    var item=event.currentTarget.parentElement
    item.innerHTML += 'check'
    var headerDisplay = document.getElementById('header')
    if (header.style.display == 'none') {
        checkDisplay(headerDisplay,item)
    }
    item.remove()
    statisticCounter()
}

function deleteFake(event) {
    var item = event.currentTarget.parentElement
    event.currentTarget.remove()
    item.innerHTML = item.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>','')
    item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
    item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
}

//save
function saveTask() {
    var checkValidate = document.getElementById('header-taskname-edit')
    if(checkValidate.value.trim() != '') {
        var saveIndex = document.getElementById('save')
        var taskList = document.getElementById('task-list')
        var liSave = taskList.childNodes[saveIndex.value]
        var nodeFirst = liSave.childNodes[0]
        var nodeSecond = nodeFirst.childNodes[0]
        if(nodeSecond.checked == true) {
            liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)" checked="true">'+checkValidate.value.trim() + '</label>' 
        }
        else {
            liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)">'+checkValidate.value.trim() + '</label>'     
        }
        liSave.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        liSave.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        document.getElementById('header').style.display = 'block'
        document.getElementById('save-edit').style.display = 'none'
        document.getElementById('valid-edit').style.display = 'none'
    }
}

function validateEdit() {
    var checkValidate = document.getElementById('header-taskname-edit')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid-edit').style.display='block'
        document.getElementById('valid-edit').innerText = '*this field is madatory'
    }
}

function deleteAttentionEdit() {
    var checkBorder = document.getElementById('header-taskname-edit')
    if (document.getElementById('valid-edit').style.display == 'block') {
        document.getElementById('valid-edit').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

function editTaskName(event) {
    if (document.getElementById('header').style.display == 'none') {
        alert('Have to save before edit next')
    }
    else {
        var item = event.currentTarget.parentElement
        var item1 = event.currentTarget.parentElement.innerHTML
        var transit = document.getElementById('header-taskname-edit')
        var saveIndex = document.getElementById('save')
        transit.value = item.childNodes[0].innerText
        var item2 = event.currentTarget
        item2.innerHTML += 'hello'
        document.getElementById('header').style.display = 'none'
        document.getElementById('save-edit').style.display = 'block'
        var taskList = document.getElementById('task-list')
        var i = 0
        for(i; i < taskList.childNodes.length; i++) {
            if(taskList.childNodes[i].innerHTML == item.innerHTML) {
                break;
            }
        }
        item2.innerHTML = item2.innerHTML.replace('hello','')
        var saveIndex = document.getElementById('save')
        saveIndex.value = i
    }
}

function findIndex(item) {
    var taskList = document.getElementById('task-list') 
    var i = 0
    while (taskList.childNodes[i].innerHTML != item.innerHTML) {
        i++
    }
    return i
}

function disabledButton(event) {
    var check = event.currentTarget.parentElement
    var checkParent = check.parentElement
    if (checkParent.innerHTML.includes('checked="true"') == true) {
        checkParent.innerHTML = checkParent.innerHTML.replace('checked="true"','')
        checkParent.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        checkParent.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        checkParent.childNodes[0].style.textDecoration = 'none'
        var taskList = document.getElementById('task-list')
        var item = document.createElement('li')
        item.innerHTML = checkParent.innerHTML
        taskList.append(item)
        checkParent.remove()
        statisticCounter()
    }
    else {
        checkSaveDisplay(checkParent, check)
    }
}

function checkSaveDisplay(checkParent, check) {
    var onsave = document.getElementById('header')
    if (onsave.style.display == 'none') {
        document.getElementById('valid-edit').style.display='block'
        document.getElementById('valid-edit').innerText = 'Saving before changing'
        check.childNodes[0].checked = false
    }
    else {
        checkParent.innerHTML = checkParent.innerHTML.replace('(event)"','(event)" checked="true"')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>','')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="no-button" onclick="deleteFake(event)">No</button>','')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>','')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>','')
        checkParent.childNodes[0].style.textDecoration = 'line-through'
        var doneList = document.getElementById('done-list')
        var item = document.createElement('li')
        item.innerHTML = checkParent.innerHTML
        doneList.append(item)
        checkParent.remove()
        }
        else {
            var checkValidate = document.getElementById('header-taskname-edit')
            document.getElementById('valid-edit').style.display='block'
            document.getElementById('valid-edit').innerText = 'Saving before changing'
            check.childNodes[0].checked = false
        }
    }
    statisticCounter()
}

function dropDown() {
    document.getElementById("dropdown-list").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.drop-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i = 0;
    for (i; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
var buttonText = document.getElementsByClassName('drop-button')

function allShow() {
    var listTask = document.getElementById('task-list')
    var doneList = document.getElementById('done-list')
    listTask.style.display = 'block'
    doneList.style.display = 'block'
    buttonText[0].innerText = 'All'
}

function doneShow() {
    var onsave = document.getElementById('header')
    if (onsave.style.display == 'none') {
        var checkValidate = document.getElementById('header-taskname-edit')
        document.getElementById('valid-edit').style.display = 'block'
        document.getElementById('valid-edit').innerText = 'Saving before changing'    
    }
    else {
    var listTask = document.getElementById('task-list')
    var doneList = document.getElementById('done-list')
    listTask.style.display = 'none'
    doneList.style.display = 'block'
    buttonText[0].innerText = 'Done'
    }
}

function undoneShow() {
    var listTask = document.getElementById('task-list')
    var doneList = document.getElementById('done-list')
    listTask.style.display = 'block'
    doneList.style.display = 'none'
    buttonText[0].innerText = 'Undone'
}
function statisticCounter() {
    var doneCounter = document.getElementById("done-list").childElementCount
    var undoneCounter = document.getElementById("task-list").childElementCount
    var doneView = document.getElementById("done-task-percentage")
    var undoneView = document.getElementById("undone-task-percentage")
    doneView.innerHTML = "Done: " + (doneCounter/(doneCounter+undoneCounter))*100 + "%"
    undoneView.innerHTML = "Undone: " + (undoneCounter/(doneCounter+undoneCounter))*100 + "%"
}