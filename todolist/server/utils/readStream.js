function readStream (request, callback) {
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        callback(JSON.parse(body))
    })
}

module.exports = readStream