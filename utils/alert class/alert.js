class Alert {

    constructor(position,timeout,isStacked,hasDisableButton){
        this.warn = "red"
        this.warningColor = '#ff0000'
        this.position = position
        this.timeout = timeout
        this.isStacked = isStacked
        this.hasDisabledButton = hasDisableButton
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

        if (positionDescription[1] == 'left') {
            outPosition[1] = '10%'
        } 
        if (positionDescription[1] == 'center') {
            outPosition[1] = '43%'
        } 
        if (positionDescription[1] == 'right') {
            outPosition[1] = '90%'
        } 
        
        if (positionDescription[0] == 'top') {
            outPosition[0] = '10%'
        } 
        if (positionDescription[0] == 'bottm') {
            outPosition[0] = '80%'
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
module.exports.Alert = Alert