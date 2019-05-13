function postResource (path, body, callback) {
    var request = new XMLHttpRequest()
    request.open('POST', path)
    request.send(JSON.stringify(body))
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback(data)
        }
    }
    request.onerror = function () {
        alert('POST request falied')
    }
}