function Router (request, response) {
    const {method, url} = request
    this.method = method
    this.url = url

    this.get = (url, type, callback) => {
        if(this.url == url && this.method == 'GET') {
            response.writeHead(200, {'Content-Type': type})
            callback()
        }
    }

    this.delete = (url, type, callback) => {
        if(this.url == url && this.method == 'DELETE') {
            response.writeHead(200, {'Content-Type': type})            
            callback()
        }
    }

    this.post = (url, type, callback) => {
        if(this.url == url && this.method == 'POST') {
            response.writeHead(200, {'Content-Type': type})            
            callback()
        }
    }

    this.getResources = (url, callback) => {
        if(this.url == url) {
            callback()
        }
    }
}

module.exports = Router