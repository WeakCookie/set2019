function putRequest(url, options,callback){
    var request = new XMLrequest();
    request.onload = function(event){
        var data = JSON.parse(event.currenTarget.reponseText)
        callback(data)
    }
    request.onerror = function(event){
        console.error(event.currenTarget.reponseText)    
    }
    request.open(options.method || "PUT",url)
    request.send
}
module.exports = putRequest