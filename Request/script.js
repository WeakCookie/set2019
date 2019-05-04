function request(url, options, callback)
{
    var request = new XMLHttpRequest()
    request.onload = function (event) {
    var data =JSON.parse(event.currentTarget.responseText)
        callback(data)
    }
    request.open(options.method || "GET", url)
    request.setRequestHeader("Access-Control-Allow-Origin","*")
    request.send()
}
function requestPeople(event) {
    let getID = event.currentTarget.parentElement.id   
    let temp = "https://swapi.co/api/" + getID
    request(temp, {method: 'GET'},(data) => {
        document.getElementById('height').innerHTML += data.height
    })
   
}

