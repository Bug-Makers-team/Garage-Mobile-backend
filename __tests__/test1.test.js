'use strict';
require('dotenv').config();
process.env.SECRET = "bugsMakers";
const supertest = require('supertest');
const server = require('../src/server').server;
const { db } = require('../src/auth/models/index');
const mockRequest = supertest(server);
let users = {
    admin: { username: 'admin', password: 'password',phoneNum:'1234', email:'1234', role: 'admin' },
   
    user: { username: 'user', password: 'password', role: 'user' ,phoneNum:'1234', email:'1234'},
};

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('Auth Router', () => {
    Object.keys(users).forEach(userType => {
        // << Checking happy scenarios (hopefully) >>:
        describe(`${userType} users`, () => {
            it('can create one', async () => {
                const response = await mockRequest.post('/signup').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.user.id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username);
                expect(userObject.user.role).toEqual(users[userType].role);
                expect(userObject.user.email).toEqual(users[userType].email);
                expect(userObject.user.phoneNum).toEqual(users[userType].phoneNum);
                // expect(userObject.user.password).toEqual(users[userType].password);

            });

            xit('can sign-in with basic header', async () => {
                const response = await mockRequest.post('/signin').auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.user.id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username);
                expect(userObject.user.role).toEqual(users[userType].role);
            });

            it('can sign-in with bearer headers', async () => {
                // First, sign in to get a token
                const response = await mockRequest.post('/signin').auth(users[userType].username, users[userType].password);
                const token = response.body.token;
               
            });
        });
    });

    // << Checking bad scenarios >>:
    describe('bad logins', () => {
        xit('Bad Auth scenario 1 - signing in using incorrect password (Basic Auth)', async () => {
            const response = await mockRequest.post('/signin').auth('admin', 'xyz')
            const userObject = response.body;
            expect(response.status).toBe(403);
            expect(userObject.user).not.toBeDefined();
            expect(userObject.token).not.toBeDefined();
        });

        xit('Bad Auth scenario 2 - signing in with unknown user (Basic Auth)', async () => {
            const response = await mockRequest.post('/signin').auth('nobody', 'xyz')
            const userObject = response.body;
            expect(response.status).toBe(403);
            expect(userObject.user).not.toBeDefined();
            expect(userObject.token).not.toBeDefined();
        });

        xit('Bad Auth scenario 3 - bearer fails with an invalid token (Bearer Auth)', async () => {
            const bearerResponse = await mockRequest.get('/services').set('Authorization', 'Bearer foobar');
            expect(bearerResponse.status).not.toBe(200);
        });
    });
});