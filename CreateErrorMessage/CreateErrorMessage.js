class errorHandler {
    createErrorMessage () {
        if (this.specifyError() == 'EvalError') {
           return 'An error has occurred in the eval() function'
        }
        if (this.specifyError() == 'RangeError') {
            return 'A number "out of range" has occurred'
         }
         if (this.specifyError() == 'ReferenceError') {
            return 'An illegal reference has occurred'
         }
         if (this.specifyError() == 'SyntaxError') {
            return 'A syntax error has occurred'
         }
         if (this.specifyError() == 'TypeError') {
            return 'A type error has occurred'
         }
         if (this.specifyError() == 'URIError') {
            return 'An error in encodeURI() has occurred'
         }
    }
}