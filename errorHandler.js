class Alert {
    constructor(){
        this.warn = "red"
        this.warningColor = '#ff0000'
        this.position = "top-right"
        this.timeout = 2
        this.isStacked = false
        this.hasDisabledButton = false
    }
    setPosition(position){
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
    getPostion(){
        let positionDescription = this.position.split('-')
        let outPosition = ['10%', '10%']
        if (positionDescription[1] == 'center') {
            outPosition[1] = '50%'
        }
        return outPosition        
    }
    setTimeout(time){
        if (typeof time != 'number') {
            this.timeout = undefined
        } else {
            this.timeout = time
        }
    }
    setStacked(canBeStacked){
        if (typeof canBeStacked != 'boolean') {
            this.isStacked = undefined
        } else {
            this.isStacked = canBeStacked
        }
    }
    setWarnColor(color){
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
    setDisabledButton(){
        this.hasDisabledButton = true
    }
    shutDisabledButton(){
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
        let checker = new errorHandler(e)
        let ale = new Alert()
        let aa = checker.renderError(ale)
        ele.appendChild(aa)
    }
}
module.exports.errorHandler = errorHandler