var taskIndex = 0
var targetToEdit

var changeDoneRate
var changeUndoneRate
var htmlDoneRate = document.getElementById('done-rate')
var htmlUndoneRate = document.getElementById('undone-rate')

var watched = 0
var timerDisplay
var videoPlayer = document.getElementById('video-task')
var videoScreen = document.getElementById('todolist-task-video')
var videoPanel = document.getElementById('video-panel')
var timeline = document.getElementById('timeline-task')
var videoTime = document.getElementById('video-time')
let timeWatched = document.getElementById('time-watched')
let watchedBar = document.getElementById('watched-bar')

videoScreen.muted = true // for auto-play
videoScreen.addEventListener('loadedmetadata', setTimeAndPlayVideo, false)

function createTask (taskName) {
  taskIndex = taskIndex + 1

  var taskItem = document.createElement('div')
  taskItem.setAttribute('class', 'task-item')

  var span = document.createElement('span')
  span.setAttribute('onclick', 'changeTaskState(event), selectOption()')
  span.innerHTML += '<input type="checkbox" class="input-task-checkbox">'
  span.innerHTML += '<div onclick="checkTheBox(event)" class="title-task-name" id="task' + taskIndex + '">' + taskName + '</div>'
  taskItem.append(span)

  var edit = document.createElement('button')
  edit.setAttribute('id', 'edit-task-button')
  edit.setAttribute('onclick', 'editButtonClick(event)')
  edit.innerText = "EDIT"
  taskItem.append(edit)

  var del = document.createElement('button')
  del.setAttribute('id', 'del-task-button')
  del.setAttribute('onclick', 'deleteButtonClick(event)')
  del.innerText = "DELETE"
  taskItem.append(del)

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

function checkTheBox (event) {
  let parent = event.currentTarget.parentElement
  let checkbox = parent.children[0]

  debugger

  if (checkbox.checked) {
    checkbox.checked = false
  } else {
    checkbox.checked = true
  }
}

function changeTaskState (event) {
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

  getStatistic()
}

function clearAllInforms () {
  let validateField = document.getElementById('validate-task-name')
  validateField.innerText = ""
}

function addTask () {
  if (!validate()) {
    return false
  }

  var taskInput = document.getElementById('input-task-name')
  var taskName = taskInput.value.trim()
  var taskList = document.getElementById('task-list')
  var taskItem = createTask(taskName)

  let selector = document.getElementById('select-box')
  let selection = selector[selector.selectedIndex].value

  if (selection == 'done') {
    taskItem.style.display = 'none'
    taskItem.style.animationName = 'hidden-task'
  }

  taskList.appendChild(taskItem)
  taskInput.value = ''

  changeColor()
  getStatistic()  
}

function validate () {
  let inputTaskName = document.getElementById('input-task-name')

  if (inputTaskName.value == '') {
    let annoucement = document.getElementById('validate-task-name')
    annoucement.innerText = '* This field is mandatory'
    annoucement.style.color = 'red'
    return false
  }

  return true
}

function editButtonClick (event) {
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

function deleteButtonClick (event) {
  let item = event.currentTarget.parentElement
  let toBeLined = item.children[0].children[1]
  removeButtonByParent(item)
  isEditingTask(toBeLined)
  item.innerHTML += '<button id="yes-button" onclick="selectYes(event)">YES</button>'
  item.innerHTML += '<button id="no-button" onclick="selectNo(event)">NO</button>'
}

function selectYes (event) {
  let item = event.currentTarget.parentElement
  item.style.animationName = 'delete-task-item' 
  setTimeout(function(){
    item.remove()
    changeColor()
  },1000)
  getStatistic()
}

function selectNo (event) {
  let parent = event.currentTarget.parentElement
  displayButtonByParent(parent)

  let yesButton = parent.children[3]
  yesButton.remove()
  let noButton = parent.children[3]
  noButton.remove()
}

function selectOption () {
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
}

function changeColor () {
  let tasksList = document.getElementsByClassName('task-item')
  let numberOfTasks = tasksList.length
  let displayNone = 0;

  for (var i = 0; i < numberOfTasks; i++) {
    let task = tasksList[i]

    if (task.style.display == 'none') {
      displayNone = displayNone + 1
    } else if ((i + displayNone) & 1) {
      task.style.backgroundColor = '#ffffff'
    } else {
      task.style.backgroundColor = '#cccccc'
    }
  }
}

function displayAllTasks () {
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  for (var i = 0; i < numberOfTasks; i++) {
    let task = toBeChecked[i]
    let elementToDisplay = task.parentElement.parentElement
    elementToDisplay.style.display = 'block'
    if (elementToDisplay.style.animationName == 'hidden-task') {
      elementToDisplay.style.animationName = 'active-task'
    }
  }
  changeColor()
}

function hideTask (item) {
  item.style.animationName = 'hidden-task'

  setTimeout(function () {
    item.style.display = 'none'
  }, 1500)
}

function showTask (item) {
  setTimeout(function () {
    item.style.display = 'block'
  }, 1500)

  setTimeout(function () {
    if (item.style.animationName == 'hidden-task') {
      item.style.animationName = 'active-task'
    }
  }, 1500)
}

function displayTaskDone () {
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length

  for (var i = 0; i < numberOfTasks; i++) {
    let task = toBeChecked[i]
    let elementToDisplay = task.parentElement.parentElement
    if (!task.checked) {
      hideTask(elementToDisplay)
    } else {
      showTask(elementToDisplay)
    }
  }
  setTimeout(changeColor, 1500)
}

function displayUndoneTasks () {
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  for (var i = 0; i < numberOfTasks; i++) {
    let task = toBeChecked[i]
    let elementToDisplay = task.parentElement.parentElement
    if (task.checked) {
      hideTask(elementToDisplay)
    } else {
      showTask(elementToDisplay)
    }
  }
  setTimeout(changeColor, 1500)
}

function getStatistic () {
  let tasksCheckers = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = tasksCheckers.length
  let newDoneRate = 0
  let newUndoneRate = 0

  for (var i = 0; i < numberOfTasks; i++) {
    let task = tasksCheckers[i]
    if (task.checked) {
      newDoneRate = newDoneRate + 1
    } else {
      newUndoneRate = newUndoneRate + 1
    }
  }

  if (numberOfTasks != 0) {
    newDoneRate = Math.floor(newDoneRate / numberOfTasks * 100)
    newUndoneRate = Math.ceil(newUndoneRate / numberOfTasks * 100)
  }
  runStatistic(newDoneRate, newUndoneRate)
}

function runStatistic (newDoneRate, newUndoneRate) {
  disableMouse()

  changeDoneRate = setInterval(function () {
    displayDoneRate(newDoneRate)
  }, 10)

  changeUndoneRate = setInterval(function () {
    displayUndoneRate(newUndoneRate)
  }, 10)

  setTimeout(enableMouse, 1100)
}

function displayDoneRate (newDoneRate) {
  let doneRate = Number(htmlDoneRate.innerText)

  if (doneRate > newDoneRate) {
    doneRate = doneRate - 1
    htmlDoneRate.innerText = doneRate
  }
  if (doneRate < newDoneRate) {
    doneRate = doneRate + 1
    htmlDoneRate.innerText = doneRate
  }
  if (doneRate == newDoneRate) {
    clearInterval(changeDoneRate)
  }
}

function displayUndoneRate (newUndoneRate) {
  let undoneRate = Number(htmlUndoneRate.innerText)

  if (undoneRate > newUndoneRate) {
    undoneRate = undoneRate - 1
    htmlUndoneRate.innerText = undoneRate
  }
  if (undoneRate < newUndoneRate) {
    undoneRate = undoneRate + 1
    htmlUndoneRate.innerText = undoneRate
  }
  if (undoneRate == newUndoneRate) {
    clearInterval(changeUndoneRate)
  }
}

// video

function setTimeAndPlayVideo () {
  videoTime.innerText = convertToMinute(videoScreen.duration)
  playVideo()
}

function convertToMinute (length) {
  let minute = Math.floor(length / 60)
  let second = Math.floor(length % 60)
  if (second < 10) {
    second = '0' + second
  }
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
  timerDisplay = setInterval(frame, 100)
}

function stopProgressBar () {
  clearInterval(timerDisplay)
}

function frame () {
  if (watched >= videoScreen.duration) {
    renderButton({
      function: playVideo,
      class: 'video-button',
      id: 'play-task-button',
      icon: '<img src="https://img.icons8.com/metro/26/000000/play.png">',
      replace: 'pause-button'
    })
    watched = 0
    stopProgressBar()
  } else {
    watched = watched + 0.1;
    timeWatched.innerText = convertToMinute(watched)
    watchedBar.style.width = watched / videoScreen.duration * 100 + '%'
  }
}

function changeVolume () {
  if (!videoScreen.muted) {
    videoScreen.muted = true
    renderButton({
      function: changeVolume,
      class: 'video-button',
      id: 'mute-button',
      icon: '<img src="https://img.icons8.com/metro/26/000000/no-audio.png">',
      replace: 'unmute-button'
    })
  } else {
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
  } else if (videoScreen.webkitRequestFullScreen) {
    videoScreen.webkitRequestFullScreen()
  }
}

function chooseTime (event) {
  let chosenTime = event.offsetX / timeline.offsetWidth * videoScreen.duration
  videoScreen.currentTime = chosenTime
  watched = chosenTime
  timeWatched.innerText = convertToMinute(watched)
  watchedBar.style.width = watched / videoScreen.duration * 100 + '%';
}

// transition

function activatePanel () {
  let videoPanel = document.getElementById("video-panel")
  videoPanel.classList.add('active-panel')
}

function hidePanel () {
  let videoPanel = document.getElementById("video-panel")
  videoPanel.classList.remove('active-panel')
}

// wait for display statistic

function disableMouse () {
  let taskHeader = document.getElementById('task-header')
  taskHeader.style.pointerEvents = 'none'

  let taskList = document.getElementById('task-list')
  taskList.style.pointerEvents = 'none'
}

function enableMouse () {
  let taskHeader = document.getElementById('task-header')
  taskHeader.style.pointerEvents = 'auto'

  let taskList = document.getElementById('task-list')
  taskList.style.pointerEvents = 'auto'
}
