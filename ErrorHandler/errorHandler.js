class errorHandler {
    constructor (e) {
        if (e instanceof Error) {
            this.error = e
        } else {
            this.error = undefined
        }
    }
    createErrorMessage () {
        
    }
    specifyError () {
        
    }
    renderError () {
        
    }
    throwError (e) {
        if (e == "") {
            throw "Empty input"
        } else if (e == undefined) {
            throw "Undefined input"
        } else if (isNaN(e)) {
            throw "Not a number input"
        }
    }
}

module.exports.errorHandler = errorHandler