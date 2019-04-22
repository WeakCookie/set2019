function getStatistic() {
    let statisticSpace = document.getElementById('statistic-content')
    statisticSpace.innerHTML = ''
    let tasksCheckers = document.getElementsByClassName('input-task-checkbox')
    let numberOfTasks = tasksCheckers.length
    let doneRate = 0
    let undoneRate = 0 
    for (var i = 0; i < numberOfTasks;i++) {
        if (tasksCheckers.value) {
            doneRate = doneRate + 1
        } else {
            undoneRate = undoneRate + 1
        }
    }

    doneRate = doneRate/numberOfTasks
    undoneRate = undoneRate/numberOfTasks
    statisticSpace.innerHTML += '<div>Done:</div>' + '<div>'+ doneRate +'</div>'
    statisticSpace.innerHTML += '<div>Undone:</div>' + '<div>'+ undoneRate +'</div>'
    
}