
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

    renderError (alert) {
        let errorAlert = document.createElement('div')
        errorAlert.className = 'error-alert'
        document.body.appendChild(errorAlert)
        
        let errorSpecified = document.createElement('span')
        errorSpecified.className = 'error-name'
        errorSpecified.innerText = this.specifyError()
        errorAlert.appendChild(errorSpecified)
        
        let position = alert.position.split('-')
        //position
        if (position[0] == 'top') {
            errorAlert.style.top = '10px'
        } else {
            errorAlert.style.bottom = '10px'
        }
        
        if (position[1] == 'right') {
            errorAlert.style.animationName = 'error-render-right'
        } else if (position[1] == 'left') {
            errorAlert.style.animationName = 'error-render-left'
        } else if(position[1] == 'center') {
            errorAlert.style.left = '43%'
            if(position[0] == 'top')
                errorAlert.style.animationName = 'error-render-center-top'
            else
                errorAlert.style.animationName = 'error-render-center-bottom'
        }

        errorAlert.style.animationDuration = alert.timeout + 's'

        if (alert.hasDisableButton) {
            let disableButton = document.createElement('button')
            disableButton.addEventListener('click',function(){errorAlert.remove()})
            disableButton.id = 'disable-button'
            disableButton.innerHTML = '<img src="https://img.icons8.com/metro/26/000000/multiply.png"></img>'
            errorAlert.appendChild(disableButton)
        }
    }

    static throwError (consoleMessage) {
        return consoleMessage
    }
}

function testAlert() {
    try {
        adddlert (a + b)
    } catch (e) {
        let alertOptions = new Alert("top-right",4,true,true)
        let checker = new errorHandler(e)
        checker.renderError(alertOptions)
    }
}

module.exports.errorHandler = errorHandler