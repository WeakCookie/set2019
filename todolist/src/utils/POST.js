function postResource (path, body, callback) {
    var request = new XMLHttpRequest()
    request.open('POST', path)
    request.send(JSON.stringify(body))
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            callback(JSON.parse(this.response))
        }
    }
    request.onerror = function () {
        console.error('POST request falied')
    }
}