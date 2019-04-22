var i = 0
let targetToEdit

function createTask(text) {
    i = i + 1

    var taskItem = document.createElement('div')
    taskItem.setAttribute("class", "task-item")
    
    var label = document.createElement('label')
    label.setAttribute('onclick','changeTaskState()')
    label.innerHTML += '<input type="checkbox" class="input-task-checkbox">'
    var id = 'task' + i
    label.innerHTML += '<div class="title-task-name" id=' + id +'>' +text+'</div>'

    taskItem.append(label)

    var edit = document.createElement('button')
    edit.setAttribute('id', 'edit-task-button')
    edit.setAttribute('onclick', 'editButtonClick()')
    edit.innerText = "EDIT"
    taskItem.append(edit)

    var del = document.createElement('button')
    del.setAttribute('id', 'del-task-button')
    del.setAttribute('onclick','deleteButtonClick ()' )
    del.innerText = "DELETE"
    taskItem.append(del)
    
    return taskItem
}

function changeTaskState() {
    let containerElement = event.currentTarget.parentElement
    let toBeLined = containerElement.children[0].children[1]
    let aCheckbox = containerElement.children[0].children[0]
    // let toBeLined = toBeLined.children[1]

    if (aCheckbox.checked) {
      toBeLined.style.textDecoration = 'line-through'
      let editButton = event.currentTarget.parentElement.children[1]
      editButton.style.display = 'none'
      let delButton = event.currentTarget.parentElement.children[2]
      delButton.style.display = 'none'
    } else {
      toBeLined.style.textDecoration = 'none'
      let editButton = event.currentTarget.parentElement.children[1]
      editButton.style.display = 'inline-block'
      let delButton = event.currentTarget.parentElement.children[2]
      delButton.style.display = 'inline-block'
    }
}

function modifyTask() {
    if (validate() == true) {
      addTask()  
      changeColor()
    } else {
      let annoucement = document.getElementById('validate-task-name')
      annoucement.innerText = '*This field is mandatory'
      annoucement.style.display = 'block'
      annoucement.style.color = 'red'
    }
}

function clearAllInforms() {
    let validateField = document.getElementById('validate-task-name')
    validateField.innerText = ""
}

function addTask() {
    var taskInput = document.getElementById('input-task-name')
    var taskTxt = taskInput.value.trim()
    var taskList = document.getElementById('task-list')
  
    if (taskTxt === '') { 
      return 
    }
    taskList.appendChild(createTask(taskTxt))
    taskInput.value = ''
}

function validate() {
    let inputTaskName = document.getElementById('input-task-name')
    if (inputTaskName.value == '') {
      return false
    }
    return true
}

function editButtonClick () {
    var item = event.currentTarget.parentElement
    targetToEdit = item.children[0].children[1]
    var inputTaskName = document.getElementById('input-task-name')
    inputTaskName.value = item.children[0].children[1].innerText

    var editButton = document.getElementById('edit-name-button')
    editButton.style.display = 'inline-block'

    var addButton = document.getElementById('add-task-button')
    addButton.style.display = 'none'
}
function changeName() {
  let taskName = document.getElementById('input-task-name')

  targetToEdit.innerText = taskName.value
  let editButtonHeader = event.currentTarget
  editButtonHeader.style.display = 'none'
  taskName.value = ''
  let addButton = document.getElementById('add-task-button')
  addButton.style.display = 'inline-block'
}
function deleteButtonClick () {
    let item = event.currentTarget.parentElement
    var editButton = item.children[1]
    editButton.style.display = 'none'

    let deleteButton = item.children[2]
    deleteButton.style.display = 'none'

    item.innerHTML += '<button id = "yes-button" onclick = "selectYes()">YES</button>'
    item.innerHTML += '<button id = "no-button" onclick = "selectNo()">NO</button>'

}

function changeColor() {
    let tasksList = document.getElementsByClassName('task-item')
    let numberOfTasks = tasksList.length

    for (var i = 0 ; i < numberOfTasks;i++) {
        let task = tasksList[i]
        if (i % 2 == 0) {
            task.style.backgroundColor = '#CCCCCC'
        } else {
          task.style.backgroundColor = '#FFFFFF'
        }
    }
}

function selectYes () {
    let item = event.currentTarget.parentElement
    item.remove()
    changeColor()
}

function selectNo () {
    let containerElement = event.currentTarget.parentElement

    let editButton = containerElement.children[1]
    editButton.style.display = 'inline-block'
    
    let deleteButton = containerElement.children[2]
    deleteButton.style.display = 'inline-block'

    let yesButton = containerElement.children[3]
    yesButton.remove()

    let noButton = containerElement.children[3]
    noButton.remove()
}

function slectOption() {
  // alert ('run')
  let selector = document.getElementById('select-box')
  let selection = selector[selector.selectedIndex].value

  if(selection == 'all') {
      displayAllTasks()
  } else if(selection == 'done') {
     displayTaskDone()
     
  } else {
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
var timeline = document.getElementById('timeline-task')
var videoTime = document.getElementById('video-time')
let timeWatched = document.getElementById('time-watched')
let watchedBar = document.getElementById('watched-bar')
var watched = 0
var timer

videoScreen.muted = true // for auto-play
videoScreen.addEventListener('loadedmetadata', function() {
  videoTime.innerText = convertToMinute(videoScreen.duration)
  playVideo()    
}, false);


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
    } 
    else {
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

function chooseTime (event) {
  let chosenTime = event.offsetX / timeline.offsetWidth * videoScreen.duration
  videoScreen.currentTime = chosenTime
  watched = chosenTime
  timeWatched.innerText = convertToMinute(watched)
  watchedBar.style.width = watched / videoScreen.duration * 100 + '%';
}
