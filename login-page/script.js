function logIn() {
    var request = new XMLHttpRequest()
    var obj = {}
    obj.email = document.getElementById('email').value
    obj.password = document.getElementById('password').value
    request.open('POST','http://localhost:3000/check')  
    request.send(JSON.stringify(obj))
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        if (this.response == 'true')
            window.location = 'http://localhost:3000/home'
        else
            alert('Log In failed')
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
        }
    }
}

function register() {
    var request = new XMLHttpRequest()
    var obj = {}
    obj.email = document.getElementById('register-email').value
    obj.password = document.getElementById('register-password').value
    request.open('POST','http://localhost:3000/register')  
    request.send(JSON.stringify(obj))
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response == 'true')
                window.location = 'http://localhost:3000/home'
            else  {
                alert('Sign-up failed')
                document.getElementById('register-email').value = ''
                document.getElementById('register-password').value = ''
            }
        }
    }
}
function logOut() {
    window.location = 'http://localhost:3000/log-in'
}

function signUp() {
    window.location = 'http://localhost:3000/sign-up'
}

