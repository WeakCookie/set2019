function getVideo (url, response, fileReader) {
    let videoPath = 'c:\\Users\\Bui D Anh\\Desktop\\set2019\\server\\assets\\videos\\todolist.mp4'
    if (url != '/api/video') {
        return
    }
    fileReader.readFile(videoPath, null, (error, data) => {
        if (error) {
            console.error(error)
        }
        response.writeHead(200, {'content-type' : 'video/mp4'})
        response.write(data)
        response.end()
    })
}

module.exports.getVideo = getVideo