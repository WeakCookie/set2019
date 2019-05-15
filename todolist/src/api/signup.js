function signup() {
    let data = {
        username : document.getElementById('email').value,
        password : document.getElementById('password').value
    }

    postResource('/signup', data, response => {
        if(response.validate) {
            window.location = 'http://localhost:3000/todolist' 
        } else {
            alert('wrong')
        }
    })
}