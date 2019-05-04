function deleteItems() {

}

function getRequest(link) {
    let request = new XMLHttpRequest()
    request.open('GET',link)
    request.send()

    request.onload = function(event) {
        let data = JSON.parse(event.currentTarget.responseText)
        displayInformation(data)
    }
}

let id = 0
let dropDownButton = '<button onclick="dropDownInfo(event)"><img src="https://img.icons8.com/ios-glyphs/26/000000/sort-right.png"></img></button>'

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

function displayInformation (data) {
    let item = createItem(data)
    
    Object.keys(data).forEach(key => {
        if(!(data[key] instanceof Array)) {
            if (data[key].includes('http')) {
                let subItem = document.createElement('ul') 
                subItem.innerHTML += dropDownButton             
                item.appendChild(subItem)
            }
            let property = document.createElement('li')
            let text = document.createTextNode(`${key} : ${data[key]}`)
            property.appendChild(text)
            item.appendChild(property)
        } else  {
            for (var i in data[key]) {

            }
        }
    })

    document.getElementById('item-container').appendChild(item)
}

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


