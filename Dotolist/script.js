
  
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
    var item = event.currentTarget.parentElement
    var nodeFirst = item.childNodes[0]
    var nodeSecond = nodeFirst.childNodes[0]
    if (document.getElementById('valid').style.display == 'block'|| document.getElementById('valid-edit').style.display == 'block') {
        document.getElementById('valid').style.display = 'none'
        document.getElementById('valid-edit').style.display = 'none'
    }
    if (nodeSecond.checked == true) {
       item.innerHTML = item.innerHTML.replace('<label><input type="checkbox onclick="disabledButton(event)">','<label><input type="checkbox" checked="true">')
    }
    item.innerHTML = item.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>','')
    item.innerHTML = item.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>','')
    item.innerHTML += '<button class="no-button" onclick="deleteFake(event)">No</button>'
    item.innerHTML += '<button class="yes-button" onclick="deleteForever(event)">Yes</button>'
}

function deleteForever(event) {
    var item = event.currentTarget.parentElement
    item.innerHTML += 'check'
    var headerDisplay = document.getElementById('header')
    if (header.style.display == 'none') {
        checkDisplay(headerDisplay,item)
    }
    item.remove()
    statisticCounter()
}
function checkDisplay(objectDisplay, item) {
    if (item.innerHTML == document.getElementById('task-list').childNodes[document.getElementById('save').value].innerHTML) {
        objectDisplay.style.display = 'block'
        document.getElementById('save-edit').style.display = 'none'
        document.getElementById('header-taskname-edit').value=''
    }
    else {
        item.innerHTML = item.innerHTML.replace('check','')
        item.innerHTML += 'delete'
        var taskList = document.getElementById('task-list')
        checkSave(item,taskList)
    }
}
function checkSave(item, taskList) {
    var i = 0
    while (item.innerHTML != taskList.childNodes[i].innerHTML) {
        i++
    }
    if (i < document.getElementById('save').value) {
        document.getElementById('save').value--
    }
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
    if (checkValidate.value.trim() != '') {
        var saveIndex = document.getElementById('save')
        var taskList = document.getElementById('task-list')
        var liSave = taskList.childNodes[saveIndex.value]
        var nodeFirst = liSave.childNodes[0]     
        var nodeSecond = nodeFirst.childNodes[0]
        checkNode(nodeSecond, liSave, checkValidate.value)
        liSave.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        liSave.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        document.getElementById('header').style.display = 'block'
        document.getElementById('save-edit').style.display = 'none'
        document.getElementById('valid-edit').style.display = 'none'
    }
}

function checkNode(node, liSave, checkValidateValue) {
    if (node.checked == true) {
        liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)" checked="true">'+checkValidateValue.trim() + '</label>' 
    }
    else {
        liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)">'+checkValidateValue.trim() + '</label>'     
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
        item2.innerHTML = item2.innerHTML.replace('hello','')
        saveIndex.value = findIndex(item)
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
        var taskList = document.getElementById('task-list')
        var item = document.createElement('li')
        item.innerHTML = checkParent.innerHTML
        item.childNodes[0].style.textDecoration = 'none'
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
        var doneList = document.getElementById('done-list')
        var item = document.createElement('li')
        item.innerHTML = checkParent.innerHTML
        item.childNodes[0].style.textDecoration = 'line-through'
        doneList.append(item)
        checkParent.remove()
    }
    statisticCounter()
}
function dropDown() {
    document.getElementById("dropdown-list").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.drop-button')) {
        dropdownShow()
    }
}

function dropdownShow() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i = 0;
    for (i; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        openDropdownShow(openDropdown);
    }
}

function openDropdownShow(openDropdown) {
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
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