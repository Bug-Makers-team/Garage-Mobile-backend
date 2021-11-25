'use strict';

const PORT = process.env.PORT || 8080;

const io = require('socket.io')(PORT);

const service = io.of('/server');
let massegQ = {
    serviceQ: {},
};

service.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);

    socket.on('service', (payload) => {
        massegQ.serviceQ[payload.id] = payload
        // console.log('====================================');
        // console.log('before');
        // console.log(massegQ);
        // console.log('====================================');
        service.emit('client', { id: payload.id, payload: massegQ.serviceQ[payload.id] })
    })

    service.on("recived", (payload) => {
        // service.emit('recivedMsg', payload)
        console.log("before deleting from Msg Q >>", msgQueue);
        delete massegQ.serviceQ[payload.id];
        console.log("after deleting from Msg Q >>", msgQueue);

    });
});