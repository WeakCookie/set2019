var combineArr = []
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
let checkboxInfor = {}

function display(url) {
  requestInfo(url)
  .then((data) => {
    list.innerHTML = ""
    for(let i = 0; i < data.results.length; i++) {
    if(data.results[i].name === undefined) {
      list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +
      ',event)"> <i class="fas fa-chevron-right"></i> '+ data.results[i].title + '<input type="checkbox" id="outter-check-box" onclick="getCombinedArr()" ></button>'
      list.innerHTML += "<div id='details'></div>"
    }
    else {
      list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +
      ',event)"> <i class="fas fa-chevron-right"></i> '+ data.results[i].name + '<input type="checkbox" id="outter-check-box" onclick="getCombinedArr()"></button>'
      list.innerHTML += "<div id='details'></div>"
    } 
    }
    if (data.previous !== null) {
      objectDetail.innerHTML += '<button id="previous-page" onclick="display(' + "'" + data.previous + "'" +')">previous</button>'
      list.appendChild(objectDetail)
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
  let objectDetail = document.createElement('div')
  objectDetail.setAttribute('class', 'title-detail-tag')
  let tickButton = createCheckBox({
    'class': 'checkbox-to-combine',
    'onclick': getCombineDetails
  })
  for ( var key in data) {
    if(data[key].length === 0) {
      objectDetail.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": none</p>"
      detailsContent.appendChild(objectDetail)
    }
    else if(key !== 'url' && key !== 'episode_id' && data[key].indexOf('https') === 0 ) {
      detailsContent.innerHTML += "<button id='inner-collapsible' onclick = 'displaymore("+ '"' + data[key] + '"' + ", event)'> <i class='fas fa-chevron-right'></i> " + key + "</button>"
      detailsContent.innerHTML += "<div id='details'></div>"
    }
    else if (typeof data[key] === "object") {
      detailsContent.innerHTML += "<button id='inner-collapsible' onclick = 'displaymore("+ '"' + data[key] + '"' + ", event)'> <i class='fas fa-chevron-right'></i> " + key + "</button>"
      detailsContent.innerHTML += "<div id='details'></div>"
    } 
    else {
      objectDetail.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": " + data[key] +"</p>"
      detailsContent.appendChild(objectDetail)
    }
  }
  collapseAnimation (detailsContent)
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
    detailsContent.previousElementSibling.innerHTML += "<input type='checkbox' id='check-box' onclick='getCombinedArr()'></input>"
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

function getSmallerCombinedArr(innercheckboxs, tempArr) {
  for(var i = 0 ; i < innercheckboxs.length ; i++) {
    if(innercheckboxs[i].checked == true) {
      var content = innercheckboxs[i].parentElement.nextElementSibling.innerText 
      tempArr.push(content.split('\n\n')) 
    } 
  }
}

function getCombinedArr() {
  combineArr = []
  var outterCheckBoxs = document.querySelectorAll('#outter-check-box')
  for ( var i = 0 ; i < outterCheckBoxs.length ; i++) {
    if(outterCheckBoxs[i].checked == true) {
      var currentcontent = outterCheckBoxs[i].parentElement.nextElementSibling
      var currentButtonName = outterCheckBoxs[i].parentElement.innerText
      var innercheckboxs = currentcontent.querySelectorAll('#check-box')
      var tempArr = [currentButtonName]
      getSmallerCombinedArr(innercheckboxs, tempArr)
      combineArr.push(tempArr)
    }
  }
  console.log(combineArr)
  console.log(combineArr[0])
}



function showCombinedResult() {
  var str = ""
  for (var i = 0 ; i < combineArr.length; i++) {
    str += combineArr[i][0] + "/"
    for (var j = 1 ; j < combineArr[i].length; j++) {
      for(var k = 0 ; k < combineArr[i][j].length; k++) {
         str += combineArr[i][j][k] + "/"
      }
    }
    console.log(str)
    str = ""
  }
}

