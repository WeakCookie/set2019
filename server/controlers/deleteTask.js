
function deleteTask(req,res,data,tasklist) {
        tasklist.splice(data,1)
        res.end()
}
module.exports = deleteTask