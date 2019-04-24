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
        if(this.specifyError() !== "") {
            let position = 'bottom-right'
            let timeout = 5
            let hasDisableButton = true
            let isStacked = true
            let errorAlert = new Alert(position,timeout,hasDisableButton,isStacked)
            errorAlert.showErrorAlert()
        }
    }
    static throwError (consoleMessage) {
        return consoleMessage
    }
}

let a = new errorHandler(232)

a.renderError()

module.exports.errorHandler = errorHandler