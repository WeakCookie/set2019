var listObject = []
function request(url, options, callback)
{
    var request = new XMLHttpRequest()
    request.onload = function (event) {
        if(this.status == "200") {
            var data =JSON.parse(event.currentTarget.responseText)
            callback(data)
        }
    }
    request.open(options.method || "GET", url)
    request.send()
}
function createList(selected,length) {
    listObject = []
    document.getElementById('out-put').innerHTML = ""
    for(var i = 1; i <= length; i++) {
        let url = "https://swapi.co/api/" + selected + '/' + i 
        request(url,{method: 'GET'},(data) => {
            listObject.push(data)
            if (data.name == undefined) {
            document.getElementById('out-put').innerHTML += data.title + '<br>'
            }
            else {
                document.getElementById('out-put').innerHTML += data.name + '<br>'
            }
        })    
    }
}
function selectOption () {

    let selector = document.getElementById('select-box')
    let selection = selector[selector.selectedIndex].value
    if (selection == 'People') {  
       createList("people",87)
    }
    
    if (selection == 'Films') {
       createList("films",7)     
    }
    
    if (selection == 'Species') {
        createList("species",35)
    }
    
    if (selection == 'Planets') {
        createList("planets",10)
    }

    if (selection == 'Vehicles') {
        createList("vehicles",20)
    }
    
  }

