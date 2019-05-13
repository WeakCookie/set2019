function requestDelete (currentIndex) {
    let reqDelete = new XMLHttpRequest()
    reqDelete.open('DELETE','http://localhost:3000/delete') 
    reqDelete.send('' + currentIndex)
    reqDelete.onload = function() {
        if (this.status == 200){
            alert.popSuccess('Delete successfully!')
        }
    }
    reqDelete.onerror = function() {
        alert.popError('failed')
    }
}