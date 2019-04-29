class ErrorHandler {
    constructor (e) {
        this.error = e
    }
    specifyError() {
        if (this.error instanceof Error) {
            return this.error.name;
        }
        else {
            return null;
        }
    }
}