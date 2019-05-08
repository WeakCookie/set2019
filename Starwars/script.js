var list = document.getElementById("item-container")
var requestInfo = (url) => {
return new Promise( function (resolve,reject) {
  var request = new XMLHttpRequest()
  request.open('GET',url)
  request.send()
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    resolve(data)
  }
  request.onerror = function() {
    reject('Fail!')
  }  
 })
}

function display(url) {
  requestInfo(url)
  .then((data) => {
    list.innerHTML = ""
    for(let i = 0; i < data.results.length; i++) {
      if(data.results[i].name === undefined) {
        list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ data.results[i].title + '</button>'
        list.innerHTML += "<div id='details'></div>"
      }
      else {
        list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ data.results[i].name + '</button>'
        list.innerHTML += "<div id='details'></div>"
      }
    }
    if (data.previous !== null) {
      list.innerHTML += '<button id="previous-page" onclick="display(' + "'" + data.previous + "'" +')">previous</button>'
    }
    if (data.next !== null) {
      list.innerHTML += '<button id="next-page" onclick="display(' + "'" + data.next + "'" +')">Next</button>'
    }
    collapseAnimation (list)
  })
  .catch((data) => console.log(data))
}

function detailsRequest(url, event) {
  var detailsContent = event.currentTarget.nextElementSibling
  if (detailsContent.innerHTML !== "") {
    collapseAnimation(detailsContent)
    return
  }
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  let currentDetailsBtn = event.currentTarget
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    displayDetails(data, currentDetailsBtn)
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

//những thông tin là đường link đều được sửa thành nút có thể collapse (xổ xuống) được 
//sau này thêm tickbox thì chỉ thêm vào các nút có id = "collapsible"

function displayDetails(data, currentElement) {
  detailsContent = currentElement.nextElementSibling
  detailsContent.innerHTML= ""
  for ( var key in data) {
    if(data[key].length === 0) {
      detailsContent.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": none</p>"
    }
    else if(key !== 'url' && key !== 'episode_id' && data[key].indexOf('https') === 0 ) {
      detailsContent.innerHTML += "<button id='collapsible' onclick = 'displaymore("+ '"' + data[key] + '"' +", event)'> <i class='fas fa-chevron-right'></i> " + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML += "<div id='details'></div>"
    }
    else if (typeof data[key] === "object") {
      detailsContent.innerHTML += "<button id='collapsible' onclick = 'displaymore("+ '"' + data[key] + '"' +", event)'> <i class='fas fa-chevron-right'></i> " + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML += "<div id='details'></div>"
    } 
    else {
      detailsContent.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": " + data[key] +"</p>"
    }
  }
  collapseAnimation (detailsContent)
}

function changeUrlIntoName(url, content, key) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    content.innerHTML += "<p>" + "<strong>" + key + "</strong>" + ": " + data.name +"</p>"
  }
  request.onerror = function() {
  alert('No internet connection')
  }
} 

function changeUrlIntoTitle(url, content, key) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    content.innerHTML += "<p>" + "<strong>" + key + "</strong>" + ": " + data.title +"</p>"
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

function displaymore(urls ,event) {
  var detailsContent = event.currentTarget.nextElementSibling
  var urlArr = urls.split(',')
  var requestArr = [] 
  if (detailsContent.innerHTML !== "") {
    collapseAnimation (detailsContent)
    return
  }
  for ( var i = 0; i < urlArr.length; i++) {
    requestArr.push(requestInfo(urlArr[i]))
  }
  Promise.all(requestArr)
  .then((data) => {
    detailsContent.innerHTML = ""
    for ( let i = 0; i < data.length; i++) {
      if(data[i].name === undefined) {
        detailsContent.innerHTML += '<p>'+ data[i].title +'</p>'
      }
      else {
        detailsContent.innerHTML += '<p>'+ data[i].name +'</p>'
      }
    }
    collapseAnimation(detailsContent)
  })
  .catch((results) => console.log(results))
}

function collapseAnimation (detailsContent) {
  button = detailsContent.previousElementSibling
  button.classList.toggle('active')
  if (detailsContent.style.maxHeight){
    detailsContent.style.maxHeight = null
  } else {
    detailsContent.style.maxHeight = detailsContent.scrollHeight + "px"
  } 
}
