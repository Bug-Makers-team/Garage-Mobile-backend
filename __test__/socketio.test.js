const io = require("../socket/server");
require('../socket/admin/admin')
require('../socket/client/client')
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
});

describe("testing Server", () => {
  it("test service", async () => {
    io.emit("service", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

//   xit("test in-transit", async () => {
//     server.emit("in-transit", payload);
//     await consoleSpy();
//     expect(consoleSpy).toHaveBeenCalled();
//   });

//   xit("test delivered", async () => {
//     server.emit("delivered", payload);
//     await consoleSpy();
//     expect(consoleSpy).toHaveBeenCalled();
//   });
});
