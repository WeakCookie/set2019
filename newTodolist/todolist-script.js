var i = 0
var targetToEdit
var videoPlayer = document.getElementById('video-task')
var videoScreen = document.getElementById('todolist-task-video')
var videoPanel = document.getElementById('video-panel')
var timeline = document.getElementById('timeline-task')
var videoTime = document.getElementById('video-time')
let timeWatched = document.getElementById('time-watched')
let watchedBar = document.getElementById('watched-bar')
var watched = 0
var timer
let doneRateContainer = {
  doneRate : 0
}
let undoneRateContainer = {
  undoneRate : 0
}

videoScreen.muted = true // for auto-play
videoScreen.addEventListener('loadedmetadata', setTimeAndPlayVideo, false);


function createTask (taskName) {
    i = i + 1

    var taskItem = document.createElement('div')
    taskItem.setAttribute("class", "task-item")
    
    var label = document.createElement('label')
    label.setAttribute('onclick', 'changeTaskState(event), selectOption()')
    label.innerHTML += '<input type="checkbox" class="input-task-checkbox">'
    var id = 'task' + i
    label.innerHTML += '<div class="title-task-name" id=' + id + '>' + taskName +'</div>'

    taskItem.append(label)

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
  
    getStatistic()
}

function validate () {
    let inputTaskName = document.getElementById('input-task-name')

    if (inputTaskName.value == '') {
      let annoucement = document.getElementById('validate-task-name')
      annoucement.innerText = '*This field is mandatory'
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

function changeColor () {
    let tasksList = document.getElementsByClassName('task-item')
    let numberOfTasks = tasksList.length
    let displayNone = 0;

    for (var i = 0 ; i < numberOfTasks;i++) {
        let task = tasksList[i]

        if (task.style.display == 'none') {
          displayNone = displayNone + 1
        } else if ((i + displayNone) % 2 == 0) {
          task.style.backgroundColor = '#cccccc'
        } else {
          task.style.backgroundColor = '#ffffff'
        }
    }

    displayNone = 0
}

function selectYes (event) {
    let item = event.currentTarget.parentElement
    item.remove()
    changeColor()
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

  changeColor()
}

function displayTaskDone () {
  
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

function displayAllTasks () {
  
  let toBeChecked = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = toBeChecked.length
  for (var i = 0; i < numberOfTasks; i++) {
      let task = toBeChecked[i]
      let elementToDisplay = task.parentElement.parentElement
      elementToDisplay.style.display = "block"
  }
}

function displayUndoneTasks () {

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

function getStatistic() {
  let done = document.getElementById('done')
  let undone = document.getElementById('undone')
  let tasksCheckers = document.getElementsByClassName('input-task-checkbox')
  let numberOfTasks = tasksCheckers.length
  let doneTasks = 0
  let undoneTasks = 0

  for (var i = 0; i < numberOfTasks; i++) {
    let task = tasksCheckers[i]
    if (task.checked) {
        doneTasks = doneTasks + 1
    } else {
        undoneTasks = undoneTasks + 1
    }
  }

  if (numberOfTasks != 0) {
    // doneTasks = doneTasks / numberOfTasks
    // undoneTasks = undoneTasks / numberOfTasks
    runTweenValue(doneTasks, undoneTasks)
  } else {
    done.innerText = 'Done: ' + doneRateContainer.doneRate * 100 + '%'
    undone.innerText = 'Undone: ' + undoneRateContainer.undoneRate * 100 + '%'
  }
}

function runTweenValue (doneTasks, undoneTasks) {
  let numberOfTasks = doneTasks + undoneTasks
  let donePercentage = doneTasks / numberOfTasks
  let undonePercentage = undoneTasks / numberOfTasks // divide by 0
  donePercentage = getSign(doneRateContainer.doneRate, donePercentage)
  undonePercentage = getSign(undoneRateContainer.undoneRate, undonePercentage)
  // first param of TweenLite has problem need to handle
  alert(undonePercentage)
  TweenLite.to(doneRateContainer, 5, {doneRate : donePercentage, onUpdate:updateDoneHandler, ease:Power4.easeOut, y: -500})
  TweenLite.to(undoneRateContainer, 5, {undoneRate : undonePercentage, onUpdate : updateUndoneHandler, ease : Power4.easeOut, y: -500})
}
function getSign (a, b) {
  if (a > b) {
    return '+=' + (a-b).toString()
  } else {
    return '-=' + (b-a).toString()
  }
}
function updateDoneHandler () {
  let done = document.getElementById('done')
  done.innerText = 'Done: ' + doneRateContainer.doneRate * 100 + '%'
}
function updateUndoneHandler () {
  alert(undoneRateContainer.undoneRate)
  let undone = document.getElementById('undone')
  undone.innerText = 'Undone: ' + undoneRateContainer.undoneRate * 100 + '%'
}
//video

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
  timer = setInterval(frame, 100)
  
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
