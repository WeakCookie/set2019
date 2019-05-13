function calculate(data) {
    let result = {
        done : 0,
        undone : 0
    }
    for(var i = 0 ; i < data.length ; i++) {
        if ( data[i].checked === true ) {
            result.done++
        }
        else {
            result.undone++
        }
    }
    return result
}

module.exports = calculate