function getResource (path, callback) {
    let request = new XMLHttpRequest()
    
    request.onreadystatechange = function () {
            if (request.readyState == 4) {
                callback(JSON.parse(this.response))
            }
    }
    request.onerror = function(event) {
        console.error(event.currentTarget.responseText)
    }
    request.open("GET",path)
    request.send()
}