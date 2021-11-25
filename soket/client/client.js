"use strict";

const io = require("socket.io-client");

/* ------ CONNECT ---------- */
const host = "http://localhost:8080";
const socket = io.connect(`${host}/server`);
var faker = require("faker");

// socket.emit('service',service);
// socket.emit('emergency', emergency);
socket.on("recivedMsg", (payload) => {
  console.log('====================================');
  console.log(`the admin received your order num ${payload.id}`);
  socket.emit('clientReceived', payload)
  console.log('====================================');
});

// function service(payload) {

// }
setInterval(() => {
  let carType = faker.name.findName();
  let phone = faker.phone.phoneNumber();
  let carModel = faker.datatype.number();
  let service = faker.random.words();
  let id = faker.datatype.uuid();
  let payload = { id, carType, phone, carModel, service };
  socket.emit("service", payload);
}, 5000);
