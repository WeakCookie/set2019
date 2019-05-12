function Router (request, response) {
    const {method, url} = request
    this.method = method
    this.url = url
    this.found = false

    function readStream (callback) {
        let data = ''
        request.on('data', chunk => {
            data += chunk.toString()
        })
        request.on('end', () => {
            callback(JSON.parse(data))
        })
    }

    this.get = (url, type, callback) => {
        if(this.url == url && this.method == 'GET') {
            response.writeHead(200, {'Content-Type': type})
            this.found = true
            callback()
        }
    }

    this.delete = (url, callback) => {
        if(this.url == url && this.method == 'DELETE') {
            this.found = true
            readStream(callback)
        }
    }

    this.post = (url, callback) => {
        if(this.url == url && this.method == 'POST') {
            this.found = true
            readStream(callback)
        }
    }
}


module.exports = Router