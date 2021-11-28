const {io,massegQ} = require("../socket/server");
const adminsocket=require('../socket/admin/admin');
const clientsocket=require('../socket/client/client');

let consoleSpy;
let payload = {
  id: "97ed434e-945d-4823-a994-c7978acb4f8d",
  carType: "Loren Gleason",
  phone: "252-614-9781 x7138",
  carModel: 96429,
  service: "Outdoors",
};
beforeEach(() => {
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
});

afterEach(() => {
io.close();
consoleSpy.mockRestore();
adminsocket.disconnect();
clientsocket.disconnect();
});

describe("testing Server", () => {
  it("test service", async () => {
    io.emit("service", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("test received", async () => {
    io.emit("received", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

  // it("test queue massages", async () => {
  //   adminsocket.disconnect();
  //   massegQ.serviceQ[payload.id] = payload
  //   io.emit("service", payload);
  //   console.log(massegQ);
  //   await consoleSpy();
  //   expect(consoleSpy).toHaveBeenCalled();
  //   expect(massegQ.serviceQ).toEqual();
  // });
});
