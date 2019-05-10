var http = require('http')
var fs = require('fs')
const url = require('url')
const port = 3000
const hostname = '127.0.0.1'
var check = 0
var user = []

function collectDataFromPost(request, callback) {
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        callback(JSON.parse(body))
    })
}

var server = http.createServer(function(req, res) {
    var reqUrl = url.parse(req.url, true)
    if (reqUrl.pathname == '/' || reqUrl.pathname == '/log-in') {
        check = 0
        fs.readFile('log-in.html', function (err, html) {
            if (err) {
                throw err; 
            }
            var content = html
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(content)
            res.end();  
        })
    }
    else if (reqUrl.pathname == '/sign-up') {
        check = 0
        fs.readFile('sign-up.html', function (err, html) {
            if (err) {
                throw err; 
            }
            var content = html
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(content)
            res.end();  
        })
    }
    else if (reqUrl.pathname == '/home') {
        if (check == 0) {
            res.writeHead(302, { Location : "http://localhost:3000/log-in"})
            res.end();  
            
        }
        else {
            fs.readFile('home.html', function (err, html) {
                if (err) {
                    throw err; 
                }
                var content = html
                res.writeHead(200, {"Content-Type": "text/html"});  
                res.write(content)
                res.end();  
            })
        }
    }
    else if (reqUrl.pathname == '/script.js') {
        res.writeHead(200);
        var script = fs.readFileSync("script.js", "utf8");
        res.write(script);
        res.end();     
    }
    else if (reqUrl.pathname == '/style.css') {
        res.writeHead(200);
        var style = fs.readFileSync("style.css", "utf8");
        res.write(style);
        res.end();  
    }
    else if (reqUrl.pathname == '/check') {
       collectDataFromPost(req, result => {
           var email = result.email
           var password = result.password
           var detect = true
           for ( var count = 0; count < user.length; count++) {
               var emailCheck = user[count].email
               var passwordCheck = user[count].password
                if ((email == emailCheck) && (password == passwordCheck) && (password!= '') && (email != '')) {
                        detect = false
                        check = 1
                        res.statusCode = 200
                        res.setHeader('Content-type','application/json')
                        res.write('true')
                        res.end();
                }
            }
           if (detect == true) {
                res.statusCode = 200
                res.setHeader('Content-type','application/json')
                res.write('false')
                res.end();
           }
       }) 
    }
    else if (reqUrl.pathname == '/register') {
        collectDataFromPost(req, result => {
            var email = result.email
            var password = result.password
            if (checkRegister(email,password)) {
                 check = 1
                 var obj = {}
                 obj.email = email
                 obj.password = password
                 user.push(obj)
                 res.statusCode = 200
                 res.setHeader('Content-type','application/json')
                 res.write('true')
                 res.end();
            }
            else {
                 res.statusCode = 200
                 res.setHeader('Content-type','application/json')
                 res.write('false')
                 res.end();
            }
        }) 
     }
    else if (reqUrl.pathname == '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
    }
    else {
        res.writeHeader(404, {"Content-Type": "application/json"});  
        res.write('Page Not Found');  
        res.end();     
    }
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

function checkRegister(email, password) {
    if (checkLength(email, password) && checkNumbers(email, password) && checkUppers(email, password) && checkLowers(email, password) && checkSpaces(email, password))
        return true
    else
        return false
}
function checkNumbers(email, password) {
    if (checkNumber(email) && checkNumber(password))
        return true
    else
        return false
}
function checkUppers(email, password) {
    if (checkUpper(email) && checkUpper(password))
        return true
    else
        return false
}
function checkLowers(email, password) {
    if (checkLower(email) && checkLower(password))
        return true
    else
        return false
}
function checkSpaces(email, password) {
    if (checkSpace(email) && checkSpace(password))
        return true
    else
        return false
}

function checkLength(email, password) {
    if (email.length >= 8 && password.length >= 8)
        return true
    else
        return false
}
function checkNumber(string) {
    for ( var count = 0; count < string.length; count++) {
        if (string[count].charCodeAt(0) >= 48 && string[count].charCodeAt(0)  <= 57) {
            return true
        }
    }
    return false
}
function checkUpper(string) {
    for ( var count = 0; count < string.length; count++) {
        if (string[count].charCodeAt(0)  >= 65 && string[count].charCodeAt(0)  <= 89) {
            return true
        }
    }
    return false
}
function checkLower(string) {
    for ( var count = 0; count < string.length; count++) {
        if (string[count].charCodeAt(0)  >= 97 && string[count].charCodeAt(0)  <=  122) {
            return true
        }
    }
    return false
}
function checkSpace(string) {
    for ( var count = 0; count < string.length; count++) {
        if (string[count].charCodeAt(0)  == ' ') {
            return false
        }
    }
    return true
}