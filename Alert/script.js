 class Alert {
    
    constructor (position,timeout,hasDisableClick,isStacked)
    {   
        this.timeout = timeout
        this.isStacked = isStacked
        this.positions = position.split('-')
        this.hasDisableClick = hasDisableClick
    }
   
    popSuccess() {
        var div = document.createElement('div')
        div.className = "alert-success"
        div.innerHTML += '<i class="fas fa-check-circle"></i>'
        for (var i in this.positions) {
            if (this.positions[i]==='top') {
                div.style.top = "2vh"
            }
            if (this.positions[i]==='right') {
                div.style.left = "75vh"
            }
            if (this.positions[i]==='left') {
                div.style.left = "2vh"
            }
            if (this.positions[i]==='bottom') {
                div.style.top = "69vh"
            }
            if (this.positions[i]==='center') {
                div.style.left = "40%"
            }
        }
        if (this.isStacked) {
           div.style.position = "relative"
        }
        else {
            div.style.position = "absolute"
        }
        if (this.hasDisableClick) {
           div.innerHTML += '<i class="fas fa-times" id="close-button" onclick="disable(event)"></i>'
        }
        div.innerHTML += "<h1>Success!!</h1>"
        document.getElementById('pop-up').appendChild(div)
        setTimeout(function() { 
            document.getElementById('pop-up').removeChild(div)
        }, this.timeout)
    }

   popError() {
    var div = document.createElement('div')
    div.className = "alert-error"
    div.innerHTML += '<i class="fas fa-times-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='top') {
            div.style.top = "2vh"
        }
        if (this.positions[i]==='right') {
            div.style.left =  "75vh"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2vh"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "69vh"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
    }
    if (this.isStacked) {
        div.style.position = "relative"
    }
    else {
        div.style.position = "absolute"
    }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h1>Error!!</h1>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout(function() { 
        document.getElementById('pop-up').removeChild(div)
    }, this.timeout)
   }

   popInfo() {
    var div = document.createElement('div')
    div.className = "alert-info"
    div.innerHTML += '<i class="fas fa-info-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='top') {
            div.style.top = "2vh"
        }
        if (this.positions[i]==='right') {
            div.style.left = "75vh"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2vh"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "69vh"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
    }
    if (this.isStacked) {
        div.style.position = "relative"
    }
    else {
        div.style.position = "absolute"
    }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h1>Info!!</h1>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout(function() { 
        document.getElementById('pop-up').removeChild(div)
    }, this.timeout)
   }

   popWarning() {
    var div = document.createElement('div')
    div.className = "alert-warning"
    div.innerHTML += '<i class="fas fa-exclamation-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='top') {
            div.style.top = "2vh"
        }
        if (this.positions[i]==='right') {
            div.style.left = "75vh"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2vh"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "69vh"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
    }
    if (this.isStacked) {
        div.style.position = "relative"
    }
    else {
        div.style.position = "absolute"
    }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h1>Warning!!</h1>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout(function() { 
        document.getElementById('pop-up').removeChild(div)
    }, this.timeout)
   }
}

function disable(event) {
    var pop = event.currentTarget.parentElement
    pop.remove(); 
}

// test using Alert class using render error
let position = 'top-center'
let timeout = 5000
let hasDisableCLick = true
let isStacked = true
let alert = new Alert(position,timeout,hasDisableCLick,isStacked)

function renderWarning() {
    alert.popWarning();
}

function renderSuccess() {
    alert.popSuccess();
}
function renderError() {
    alert.popError();
}

function renderInfo() {
    alert.popInfo();
}
