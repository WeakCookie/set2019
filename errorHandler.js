class errorHandler {
    constructor (e) {
        if (e instanceof Error) {
            this.error = e
        } else {
            this.error = undefined
        }
    }
    createErrorMessage () {
        return this.error.message
    }
    specifyError () {
        return this.error.constructor.name
    }
    renderError () {
        //type code here
    }
    static throwError (consoleMessage) {
        return consoleMessage
    }
}

let a = new errorHandler(232)

a.renderError()

module.exports.errorHandler = errorHandler