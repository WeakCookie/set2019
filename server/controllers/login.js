function login(data, usersList, tokensList, callback) {
    const {username, password} = data

    if(usersList[username] == password) {
        callback({
            validate : true,
            token    : tokensList[username],
        })
    } else {
        callback({
            validate : false
        })
    }
}

module.exports = login