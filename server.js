var app     = require('express')(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http),
    express = require('express'),
    Beacon  = require('bleacon');

// Don't limit event emitters
process.setMaxListeners(0);

// serve angular front end files from root path
app.use('/', express.static('public', { redirect: false }));

Beacon.startScanning('c336aa3854bb483bae753ba707855035');

io.on('connection', (socket) => {
    Beacon.on('discover', (beacon) => {
        if (beacon.proximity === "near") {
            console.log('Prox: ' + beacon.proximity);
            socket.emit('trusted_user_exiting');

            socket.disconnect(true);
        }

        if (beacon.proximity === "immediate") {
            console.log(beacon.proximity, beacon.accuracy);
            socket.emit('trusted_user_entering');
        }
    });
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});