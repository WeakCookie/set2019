function login () {
    let data = {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value 
    }

    postResource('http://localhost:3000/login', data, response => {
        if(response.validate) {
        document.cookie = response.token
        window.location = 'http://localhost:3000/todolist'
        }
    })
}

function switchSignup() {
    window.location = 'http://localhost:3000/signup'
}