function deleteRequest(reqData, url, callback) {
    var reqDelete = new XMLHttpRequest()
    reqDelete.open('DELETE',url)
    reqDelete.send(JSON.stringify(reqData))
    reqDelete.onreadystatechange = function() {
        var data = JSON.parse(reqDelete.responseText)
        callback(data)
    }
    reqDelete.onerror = function(){
       console.error('failed')
    }
}