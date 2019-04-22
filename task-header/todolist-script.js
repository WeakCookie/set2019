var i = 0
var targetToEdit

function createTask (taskName) {
    i = i + 1

    var taskItem = document.createElement('div')
    taskItem.setAttribute("class", "task-item")
    
    var label = document.createElement('label')
    label.setAttribute('onclick','changeTaskState(),selectOption()')
    label.innerHTML += '<input type="checkbox" class="input-task-checkbox">'
    var id = 'task' + i
    label.innerHTML += '<div class="title-task-name" id=' + id + '>' + taskName +'</div>'

    taskItem.append(label)

    var del = document.createElement('button')
    del.setAttribute('id', 'del-task-button')
    del.setAttribute('onclick', 'deleteButtonClick ()' )
    del.innerText = "DELETE"
    taskItem.append(del)

    var edit = document.createElement('button')
    edit.setAttribute('id', 'edit-task-button')
    edit.setAttribute('onclick', 'editButtonClick()')
    edit.innerText = "EDIT"
    taskItem.append(edit)

    return taskItem
}

function changeToEditButtonHeader () {
    var editButton = document.getElementById('edit-name-button')
    editButton.style.display = 'inline'

    var addButton = document.getElementById('add-task-button')
    addButton.style.display = 'none'
}

function changeToAddButtonHeader () {
    var editButton = document.getElementById('edit-name-button')
    editButton.style.display = 'none'

    var addButton = document.getElementById('add-task-button')
    addButton.style.display = 'inline'
}

function removeButtonByParent (item) {
    var editButton = item.children[2]
    editButton.style.display = 'none'

    var delButton = item.children[1]
    delButton.style.display = 'none'
}

function displayButtonByParent (item) {
    var editButton = item.children[2]
    editButton.style.display = 'inline'

    var delButton = item.children[1]
    delButton.style.display = 'inline'
}

function isEditingTask (doneTask) {
    if (doneTask === targetToEdit) {
      let inputTaskName = document.getElementById('input-task-name')
      inputTaskName.value = ''
      changeToAddButtonHeader()
    }
}

function changeTaskState () {
    let parent = event.currentTarget.parentElement
    let toBeLined = parent.children[0].children[1]
    let checkbox = parent.children[0].children[0]

    if (checkbox.checked) {
      toBeLined.style.textDecoration = 'line-through'
      isEditingTask(toBeLined)
      removeButtonByParent(parent)

    } else {
      toBeLined.style.textDecoration = 'none'
      displayButtonByParent(parent)
    }
}

function modifyTask () {
    if (validate()) {
      addTask()  
      changeColor()
    }
}

function clearAllInforms () {
    let validateField = document.getElementById('validate-task-name')
    validateField.innerText = ""
}

function addTask () {
    var taskInput = document.getElementById('input-task-name')
    var taskName = taskInput.value.trim()
    var taskList = document.getElementById('task-list')

    taskList.appendChild(createTask(taskName))
    taskInput.value = ''
}

function validate () {
    let inputTaskName = document.getElementById('input-task-name')
    let toBeChecked = inputTaskName.value.trim()
    if (toBeChecked == '') {
      let annoucement = document.getElementById('validate-task-name')
      annoucement.innerText = '*This field is mandatory'
      annoucement.style.color = 'red'
      return false
    }

    return true
}

function editButtonClick () {
    var item = event.currentTarget.parentElement
    targetToEdit = item.children[0].children[1]
    var inputTaskName = document.getElementById('input-task-name')
    inputTaskName.value = item.children[0].children[1].innerText

    changeToEditButtonHeader()
}

function changeName () {
    if (!validate()) {
      return false
    }
    let taskName = document.getElementById('input-task-name')
    targetToEdit.innerText = taskName.value
    taskName.value = ''

    changeToAddButtonHeader()
}

function deleteButtonClick () {
    let item = event.currentTarget.parentElement

    removeButtonByParent(item)

    var editButton = item.children[1]
    editButton.style.display = 'none'


    let deleteButton = item.children[2]
    deleteButton.style.display = 'none'

    item.innerHTML += '<button id = "yes-button" onclick = "selectYes(),selectOption()">YES</button>'
    item.innerHTML += '<button id = "no-button" onclick = "selectNo()">NO</button>'
}

function changeColor () {
    let tasksList = document.getElementsByClassName('task-item')
    let numberOfTasks = tasksList.length
    let displayNone = 0;

    for (var i = 0 ; i < numberOfTasks;i++) {
        let task = tasksList[i]

        if (task.style.display == 'none') {
          displayNone = displayNone + 1
        } else if ((i + displayNone) % 2 == 0) {
          task.style.backgroundColor = '#CCCCCC'
        } else {
          task.style.backgroundColor = '#FFFFFF'
        }
    }
    displayNone = 0
}

function selectYes () {
    let item = event.currentTarget.parentElement
    item.remove()
    changeColor()
}

function selectNo () {
    let parent = event.currentTarget.parentElement

    displayButtonByParent(parent)

    let yesButton = containerElement.children[3]
    yesButton.remove()

    let noButton = containerElement.children[3]
    noButton.remove()
}

function selectOption() {
  let selector = document.getElementById('select-box')
  let selection = selector[selector.selectedIndex].value

  if (selection == 'all') {
      displayAllTasks()
  }
  
  if (selection == 'done') {
     displayTaskDone()     
  }
  
  if (selection == 'undone') {
      displayUndoneTasks()
  }

  changeColor()
}
function displayTaskDone() {
  
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  
  for (var i = 0; i < numberOfTasks; i++) {
      let task = toBeChecked[i]
      if (!task.checked) {
          let elementToDisplay = task.parentElement.parentElement
          elementToDisplay.style.display = "none"
      } else {
        let elementToDisplay = task.parentElement.parentElement
        elementToDisplay.style.display = "block"
      }
  }
}

function displayAllTasks() {
  
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  for (var i = 0; i < numberOfTasks; i++) {
      let task = toBeChecked[i]
      let elementToDisplay = task.parentElement.parentElement
      elementToDisplay.style.display = "block"
  }
}

function displayUndoneTasks() {
  
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  for (var i = 0; i < numberOfTasks; i++) {
      let task = toBeChecked[i]
      if (task.checked) {
          let elementToDisplay = task.parentElement.parentElement
          elementToDisplay.style.display = "none"
      } else {
        let elementToDisplay = task.parentElement.parentElement
          elementToDisplay.style.display = "block"
      }
  }
}

//video
var videoPlayer = document.getElementById('video-task')
var videoScreen = document.getElementById('todolist-task-introduce')
var videoPanel = document.getElementById('video-panel')
var videoTime = document.getElementById('video-time')
var watched = 0
var timer

videoScreen.muted = true // for auto-play

function convertToMinute (length) {
  let minute = Math.floor(length / 60)
  let second = Math.floor(length % 60)
  if(second < 10)
    second = '0' + second
  return minute + ":" + second
}

function playVideo () {
  videoScreen.play()
  startProgressBar()
  renderButton({
    function: pauseVideo,
    class: 'video-button',
    id: 'pause-button',
    icon: '<img src="https://img.icons8.com/ios/50/000000/pause-filled.png">',
    replace: 'play-task-button'
  })
  videoTime.innerText = convertToMinute(videoScreen.duration)  
}

function pauseVideo () {
  videoScreen.pause()
  stopProgressBar()
  renderButton({
    function: playVideo,
    class: 'video-button',
    id: 'play-task-button',
    icon: '<img src="https://img.icons8.com/metro/26/000000/play.png">',
    replace: 'pause-button'
  })
}

function renderButton (options) {
  let newButton = document.createElement('button')
  newButton.addEventListener('click', options.function)
  newButton.className = options.class
  newButton.id = options.id
  newButton.innerHTML = options.icon
  videoPanel.replaceChild(newButton, document.getElementById(options.replace))
}

function startProgressBar () {
  let watchedBar = document.getElementById('watched-bar')
  let length = videoScreen.duration
  let timeWatched = document.getElementById('time-watched')
  
  timer = setInterval(frame, 100)
  function frame () {
    if (watched >= length) {
      renderButton({
        function: playVideo,
        class: 'video-button',
        id: 'play-task-button',
        icon: '<img src="https://img.icons8.com/metro/26/000000/play.png">',
        replace: 'pause-button'
      })
      watched = 0
      stopProgressBar()
    } 
    else {
      watched = watched + 0.1;
      timeWatched.innerText = convertToMinute(watched)
      watchedBar.style.width = watched / length * 100 + '%';
    }
  }
}

function stopProgressBar () {
  clearInterval(timer)
}

function changeVolume () {
  if(!videoScreen.muted) {
    videoScreen.muted = true
    renderButton({
      function: changeVolume,
      class: 'video-button',
      id: 'mute-button',
      icon: '<img src="https://img.icons8.com/metro/26/000000/no-audio.png">',
      replace: 'unmute-button'
    })
  }
  else {
    videoScreen.muted = false
    renderButton({
      function: changeVolume,
      class: 'video-button',
      id: 'unmute-button',
      icon: '<img src="https://img.icons8.com/metro/26/000000/high-volume.png">',
      replace: 'mute-button'
    })
  }
}

function toggleFullScreen () {
  if (videoScreen.mozRequestFullScreen) {
    videoScreen.mozRequestFullScreen()
  } 
  else if (videoScreen.webkitRequestFullScreen) {
    videoScreen.webkitRequestFullScreen()
  }  
}
