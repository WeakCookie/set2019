let bb = require('./Alert')

class errorHandler {
    constructor (e) {
        alert('run')
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
        if(this.specifyError() !== "") {
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
                errorAlert.style.right = '10px'
            } else if (position[1] == 'left') {
                errorAlert.style.left = '10px'
            } else {
                errorAlert.style.left = '50%'
            }
            
            //timeout
            let counter = 0
            let timer = setInterval(frame,1000)
            function frame () {
                if(counter == alert.timeout) {
                    errorAlert.remove()
                    clearInterval(timer)
                }
                counter++
            }

            //disable button
            if (alert.hasDisableButton) {
                let disableButton = document.createElement('button')
                disableButton.addEventListener('click',function(){errorAlert.remove()})
                disableButton.id = 'disable-button'
                disableButton.innerHTML = '<img src="https://img.icons8.com/metro/26/000000/multiply.png"></img>'
                errorAlert.appendChild(disableButton)
            }
            return errorAlert
        }
    }
    static throwError (consoleMessage) {
        return consoleMessage
    }
}

function aaa(){
    let ele = document.getElementsByTagName('body')
    try {
        alert (a + b)
    } catch (e) {
        // alert(e instanceof Error)
        var checker = new errorHandler()
        alert('run')
        let ale = new bb.alert()
        let aa = checker.renderError(ale)
        ele.appendChild(aa)
    }
}

module.exports.errorHandler = errorHandler