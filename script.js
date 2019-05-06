let listObject = []
let id = 0
let dropDownButton = '<button onclick="dropDownInfo(event)"><img src="https://img.icons8.com/ios-glyphs/26/000000/sort-right.png"></img></button>'

function deleteItems() {
    listObject = []
    document.getElementById('item-container').innerHTML = ""
}
function getRequest() {
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
function request(url, options, callback) {
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
    deleteItems()
    for(var i = 1; i <= length; i++) {
        let url = "https://swapi.co/api/" + selected + '/' + i 
        request(url,{method: 'GET'})    
    }
}
function createItem (data) {
    let item = document.createElement('ul')
    item.className = 'item'
    item.id = 'id' + id
    id++
    item.innerHTML += dropDownButton
    // let dropDownButton = document.createElement('button')
    // dropDownButton.addEventListener('click',dropDownInfo)
    // dropDownButton.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/26/000000/sort-right.png"></img>'
    // item.appendChild(dropDownButton)
    
    item.innerHTML += data.name || data.title
    return item
} 

function renderInformation (item,data) {
    Object.keys(data).forEach(key => {
        let property = document.createElement('li')
        property.style.display = 'none'
        
        if(typeof data[key] == 'string' && !data[key].includes('http')) {
            property.innerText = `${key} : ${data[key]}`
        } 
    })

    document.getElementById('item-container').appendChild(item)
}
// function containHTTP(item) {
//     if (typeof item != "string") {
//         return false
//     }
//     item = item.slice(0, 4)
//     if (item == "http") {
//         return true
//     }
//     return false
// }


function dropDownInfo (event) {
    let parentId = event.currentTarget.parentElement.id
    let listItems = document.querySelectorAll('#' + parentId + ' li');
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].style.display == 'none') {
            listItems[i].style.display = 'block'
        } else {
            listItems[i].style.display = 'none'
        }
    }
}