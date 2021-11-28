'use strict';

const PORT = process.env.PORT || 8080;

const io = require('socket.io')(PORT);

const service = io.of('/server');
let massegQ = {
    serviceQ: {},
    received: {}
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

    socket.on("received", (payload) => {
        massegQ.received[payload.id] = payload
        console.log("before deleting from Msg Q >>", massegQ);
        service.emit('recivedMsg', { id: payload.id, payload: massegQ.received[payload.id]});    
        delete massegQ.serviceQ[payload.id];

    });

    socket.on('clientReceived', payload=>{
        delete massegQ.received[payload.id];
        console.log("after deleting from Msg Q >>", massegQ);

    })

    socket.on('getAllServiceQ',()=>{
      Object.keys(massegQ.serviceQ).forEach((id) => {
        service.emit("client", {
            payload: massegQ.serviceQ[id],
            id: id,
          });
        });

    })

    socket.on('getAllReceived',()=>{
      Object.keys(massegQ.received).forEach((id) => {
        service.emit("recivedMsg", {
            payload: massegQ.received[id],
            id: id,
          });
        });

    })
});

module.exports=io;