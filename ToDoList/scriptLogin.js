function logIn() {
    var request = new XMLHttpRequest()
    var obj = {}
    obj.user = document.getElementById('user').value
    obj.password = document.getElementById('password').value
    request.open('POST','http://localhost:3000/check')  
    request.send(JSON.stringify(obj))
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response != 'false') {
                document.cookie = this.response
                window.location = 'http://localhost:3000/todolist'
            }
            else {
                alert('Log In failed')
                document.getElementById('user').value = ''
                document.getElementById('password').value = ''
            }
        }
    }
}