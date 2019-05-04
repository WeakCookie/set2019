class Alert {
<<<<<<< Updated upstream
    constructor () {
        this.warn = "red"
        this.warningColor = '#ff0000'
        this.position = "top-right"
        this.timeout = 2
        this.isStacked = false
        this.hasDisabledButton = true
=======
    constructor(position,timeout,isStacked,hasDisableButton){
        this.warn = "red"
        this.warningColor = '#ff0000'
        this.position = position
        this.timeout = timeout
        this.isStacked = isStacked
        this.hasDisabledButton = hasDisableButton
>>>>>>> Stashed changes
    }
    setPosition (position) {
        switch (position) {
            case "top-right" :
                this.position = position
                break;
            case "top-left" :
                this.position = position
                break;
            case "top-center" :
                this.position = position
                break;
            case "bottom-right" :
                this.position = position
                break;
            case "bottom-left" :
                this.position = position
                break;
            case "bottom-center" :
                this.position = position
                break;
            default :
                break;
        }
    }
    getPostion () {
        let positionDescription = this.position.split('-')
        let outPosition = ['10%', '10%']
        if (positionDescription[1] == 'center') {
            outPosition[1] = '50%'
        }
        return outPosition        
    }
    setTimeout (time) {
        if (typeof time != 'number') {
            this.timeout = undefined
        } else {
            this.timeout = time
        }
    }
    setStacked (canBeStacked) {
        if (typeof canBeStacked != 'boolean') {
            this.isStacked = undefined
        } else {
            this.isStacked = canBeStacked
        }
    }

    setWarnColor (color) {
        switch(color) {
            case "red":
                this.warn = 'red'
                this.warningColor = '#ff0000'
                break;
            case "green":
                this.warn = 'green'
                this.warningColor = '#00ff00'
                break;
            case "yellow":
                this.warn = 'yello'
                this.warningColor = '#ffff00'
                break;

        }
    }

    setDisabledButton () {
        this.hasDisabledButton = true
    }

    shutDisabledButton () {
        this.hasDisabledButton = false
    }
}
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
<<<<<<< Updated upstream
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
            if (alert.hasDisableButton) {
                let disableButton = document.createElement('button')
                disableButton.addEventListener('click', function(){errorAlert.remove()})
                disableButton.id = 'disable-button'
                disableButton.innerHTML = '<img src="https://img.icons8.com/metro/26/000000/multiply.png"></img>'
                errorAlert.appendChild(disableButton)
            }
            return errorAlert
        }
    }
    static throwError(consoleMessage) {
=======
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
>>>>>>> Stashed changes
        return consoleMessage
    }
}

<<<<<<< Updated upstream
function testRender () {
    let ele = document.getElementsByTagName('body')
=======
function testAlert() {
>>>>>>> Stashed changes
    try {
        adddlert (a + b)
    } catch (e) {
        let alertOptions = new Alert("top-right",4,true,true)
        let checker = new errorHandler(e)
        checker.renderError(alertOptions)
    }
}

module.exports.errorHandler = errorHandler