function Router (request, response) {
    const {method, url} = request
    this.method = method
    this.url = url

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
            callback()
        }
    }

    this.delete = (url, callback) => {
        if(this.url == url && this.method == 'DELETE') {
            readStream(callback)
        }
    }

    this.post = (url, callback) => {
        if(this.url == url && this.method == 'POST') {
            readStream(callback)
        }
    }
}


module.exports = Router