
/*
 * initialize app to be a function handler
 * =======================================
 */

var app = require('express')();
var http = require('http').Server(app);

/*
 * initialize socket.io server integration
 * =======================================
 */

var io = require('socket.io')(http);

/*
 * route handler homepage
 * ======================
 */

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/*
 * route handler about page
 * ========================
 */

app.get('/about', function(req, res) {
    res.send("about");
});

/*
 * connection event for incoming socket
 * ====================================
 */

io.on('connection', function(socket) {

    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('a user leave');
    });
    
    /*
     * 'typing message' event from client
     * ==================================
     */

    socket.on('typing message', function(msg) {
        console.log('message: ' + msg);
        
        /*
         * broadcast / emit an event from server to client
         * or the rest of the users
         * ===============================================
         */
        
        io.emit('typing message', msg);
    });

});

/*
 * http server listen to port 3000
 * ===============================
 */

http.listen(3000, function() {
    console.log('socket io is starting');
});