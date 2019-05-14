function editTask(event){
    if(req.url == '/api/editTask') {
        getStream((data) => {
            for(let i = 0; i < taskList.length; i++ ) {
                if(taskList[i].taskName == data.originalName) {
                    taskList[i].taskName = data.replaceName
                    res.end('success')
                }
            }
            res.end('task not found')
        })
    }
}
module.exports = editTask