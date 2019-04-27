class Alert {
    constructor(position,timeout,hasDisableButton,isStacked){
        this.warn = "red"
        this.warningColor = '#ff0000'
        this.position = position
        this.timeout = timeout
        this.hasDisableButton = hasDisableButton
        this.isStacked = isStacked
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

    renderError (options) {
        let errorAlert = document.createElement('div')
        errorAlert.className = 'error-alert'
        document.body.appendChild(errorAlert)
        
        let errorSpecified = document.createElement('span')
        errorSpecified.className = 'error-name'
        errorSpecified.innerHTML = '<img width="20px" height="20px" src="https://img.icons8.com/color/48/000000/high-importance.png"> ' + this.specifyError()
        errorAlert.appendChild(errorSpecified)
        
        //position
        let position = options.position.split('-')
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

        //timeout
        errorAlert.style.animationDuration = (options.timeout + 3) + 's'
        setTimeout(function(){errorAlert.remove()},(options.timeout + 3) * 1000)

        //disable button
        if (options.hasDisableButton) {
            let disableButton = document.createElement('button')
            disableButton.addEventListener('click',function(){errorAlert.remove()})
            disableButton.id = 'disable-button'
            disableButton.innerHTML = '<img src="https://img.icons8.com/metro/26/000000/multiply.png"></img>'
            errorAlert.appendChild(disableButton)
        }

        //stack
        if(options.isStacked) {

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
        let alertOptions = new Alert("bottom-left",4,true,true)
        let checker = new errorHandler(e)
        checker.renderError(alertOptions)
    }
}

module.exports.errorHandler = errorHandler