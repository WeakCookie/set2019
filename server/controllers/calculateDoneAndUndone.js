function calculate(data) {
    let result = {
        done : 0,
        undone : 0
    }
    let resultPercentage = {
        donePercent: 0 ,
        undonePercent:0 
    }
    for(var i = 0 ; i < data.length ; i++) {
        if ( data[i].checked === true ) {
            result.done++
        }
        else {
            result.undone++
        }
    }
    resultPercentage.donePercent = result.done * 100/ (result.done+result.undone)
    resultPercentage.undonePercent = 100 - resultPercentage.donePercent
    return resultPercentage
}

module.exports = calculate