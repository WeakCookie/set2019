function filterTask(arrayTasks, type, callback)
{
    function satisfiedTasks (value) {
        if (value == true && type == 'done') {
            return true
        }
        if (value == false && type == 'undone') {
            return true
        }
        if (type == 'all') {
            return true
        }
        return false
    }

    let requestTasks = []

    for (let i = 0; i < arrayTasks.length; i++)
    {
        if (satisfiedTasks(arrayTasks[i].done)) {
            requestTasks.push(arrayTasks[i])
        }
    }

    callback(requestTasks)
}

module.exports = filterTask