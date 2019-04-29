class errorHandler {
    renderError () {
        if (this.specifyError() != '') {
            let alertError = new Alert(this.createErrorMessage())
            alertError.error()
        }
    }
}