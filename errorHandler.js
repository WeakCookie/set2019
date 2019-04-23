class errorHandler {
    constructor (e) {
        this.error = e
    }
    createErrorMessage () {
        //type code here
    }
    specifyError () {
        //type code here
    }
    renderError () {
        //type code here
    }
    static throwError (consoleMessage) {
        return consoleMessage
    }
}

module.exports.errorHandler = errorHandler