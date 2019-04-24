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
        if(this.specifyError() !== "") {
            let position = 'bottom-right'
            let timeout = 5
            let hasDisableButton = true
            let isStacked = true
            let errorAlert = new Alert(position,timeout,hasDisableButton,isStacked)
            errorAlert.showErrorAlert()
        }
    }
    throwError () {
        //type code here
    }
}
module.exports.errorHandler = errorHandler