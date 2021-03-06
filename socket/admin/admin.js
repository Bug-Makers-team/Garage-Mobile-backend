'use strict';

const io = require('socket.io-client');

/* ------ CONNECT ---------- */
const host = 'http://localhost:8080';
const socket = io.connect(`${host}/server`);

socket.emit('getAllServiceQ');
socket.on('client', (payload) => {
    console.log('====================================');
    console.log(payload);
    console.log('====================================');

    socket.emit('received', payload)
})

// socket.disconnect();

module.exports=socket