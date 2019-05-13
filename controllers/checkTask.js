function checkTask(url, method, task, index) {
    if (url == 'localhost:3000/todolist' && method == 'POST') {
        task[index].done = !task[index].done
    }
}
module.exports = checkTask