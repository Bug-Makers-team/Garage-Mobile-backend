'use strict';
const { db } = require("../src/auth/models/index");
const { server } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(server);
describe("Testing units for user", () => {
  beforeAll(async () => {
    await db.drop();
    await db.sync();
  });
  afterAll(async () => {
    await db.drop();
  });
  it("singUp new user", async () => {
    const res = await mockRequest.post("/signup").send({
      username: "Omar",
      password: "test",
      role: "user",
      phoneNum:'1234',
       email:'1234'

    });
    expect(res.status).toBe(201);
    const token = res.body.token;
    expect(token).toBeDefined();
  });
  it("singIn the user", async () => {
    const res = await mockRequest.post("/signin").auth("Omar", "test");
    const token = res.body.token;
    expect(res.status).toBe(200);
    expect(token).toBeDefined();
  });
  it('services route works', async () => {
    const res = await mockRequest.post("/signin").auth("Omar", "test");
    const token = res.body.token;
    const bearerResponse = await mockRequest.get('/services').set('Authorization', `Bearer ${token}`);
   expect(bearerResponse.status).toBe(200);
});
it('users route works', async () => {
  const res = await mockRequest.post("/signin").auth("Omar", "test");
    const token = res.body.token;
  const bearerResponse = await mockRequest.get('/users').set('Authorization', `Bearer ${token}`);
  expect(bearerResponse.status).toBe(500);
});
it('myservice route works', async () => {
  const res = await mockRequest.post("/signin").auth("Omar", "test");
    const token = res.body.token;
  const bearerResponse = await mockRequest.get('/myservice').set('Authorization', `Bearer ${token}`);
  expect(bearerResponse.status).toBe(200);
});
});

describe('bad logins', () => {
            it('Bad Auth scenario 1 - signing in using incorrect password (Basic Auth)', async () => {
                const response = await mockRequest.post('/signin').auth('admin', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });
    
            it('Bad Auth scenario 2 - signing in with unknown user (Basic Auth)', async () => {
                const response = await mockRequest.post('/signin').auth('nobody', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });
    
           
        });
   