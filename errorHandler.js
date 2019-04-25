class errorHandler {
    constructor (e) {
        this.error = e
    }
    createErrorMessage () {
        //type code here
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

            //stacked
            if (alert.isStacked) {

            }
    }
    throwError () {
        //type code here
    }
}
module.exports.errorHandler = errorHandler