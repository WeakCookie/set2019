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
    let container = document.getElementById('item-container')
    for(var i = 1; i <= length; i++) {
        let url = "https://swapi.co/api/" + selected + '/' + i 
        request(url, {method: 'GET'}, (data) => {
            let item = createItem(data)
            container.appendChild(item)
        })    
    }
}
function createItem (data) {
    let item = document.createElement('ul')
    item.className = 'item'
    item.id = 'id' + id
    id++

    let dropDownButton = document.createElement('button')
    item.appendChild(dropDownButton)
    dropDownButton.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/26/000000/sort-right.png"></img>'
    dropDownButton.innerHTML += data.name || data.title
    dropDownButton.addEventListener('click', function() {renderInformation(item,data)}, {once : true})
    dropDownButton.addEventListener('click',function() {dropDownInfo(item)})
    
    return item
}

function renderInformation (item,data) {
    Object.keys(data).forEach(key => {
        let property = document.createElement('li')
        property.style.display = 'none'
        
        if(typeof data[key] == 'string' && !data[key].includes('http')) {
            property.innerText = `${key} : ${data[key]}`
        } 
        
        else if(typeof data[key] == 'string' && data[key].includes('http') && key != 'url') {
            property.innerText += `${key} : `
            getRequest(data[key], {method : 'GET'}, (data) => {
                let subItem = createItem(data)
                property.appendChild(subItem)
            })
        }

        else {
            property.innerText += `${key} : `
            for (var element in data[key]) {
                getRequest(data[key][element], {method : 'GET'}, (data) => {
                    let subItem = createItem(data)
                    property.appendChild(subItem)
                })
            }
        }

        item.appendChild(property)
    })
}

function dropDownInfo (item) {
    let listItems = document.querySelectorAll('#' + item.id + ' li');
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].style.display == 'none') {
            listItems[i].style.display = 'block'
        } else {
            listItems[i].style.display = 'none'
        }
    }
}