let post = require('POST')

function login() {
    let data = {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value 
    }

    post('localhost:3000/login', data, response => {
        if(response.validate) {
            document.cookie = response.token
            window.location = 'localhost:3000/todolist'
        }
    })
}

module.exports = login