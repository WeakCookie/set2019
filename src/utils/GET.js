let getRequest = function (path, callback) {
   let request = new XMLHttpRequest()
   request.onload =function (event) {
       let data = JSON.parse(event.currentTarget.responseText)
       callback(data)
   } 
   request.onerror = function(event) {
       console.error(event.currentTarget.responseText)
   }
   request.open("GET",path)
   request.send()
}
module.exports = getRequest