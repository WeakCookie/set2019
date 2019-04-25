var c = 0;

function pop1() {
    var div = document.getElementById('alert-success')
    div.style.display = "block"
    setTimeout(function(){ div.style.display = "none"; }, 3000)
}

function pop2() {
    var div = document.getElementById('alert')
    div.style.display = "block"
    setTimeout(function(){ div.style.display = "none"; }, 3000);
}

function pop3() {
    var div = document.getElementById('alert-info')
    div.style.display = "block"
    setTimeout(function(){ div.style.display = "none"; }, 3000);
}

function pop4() {
    var div = document.getElementById('alert-warning')
    div.style.display = "block"
    setTimeout(function(){ div.style.display = "none"; }, 3000);
}

var close = document.getElementsByClassName("close-button");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
    var div = this.parentElement;
    div.style.zIndex = 1000
    setTimeout(function(){ div.style.display = "none"; }, 500);
  }
}