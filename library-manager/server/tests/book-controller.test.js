const request = require('supertest');
const app = require('../index');
const { UserModel } = require('../models/user-model');
const { closeServer, startServer } = require('../server');
const { BookModel } = require('../models/book-model');
const { RequestModel } = require('../models/request-model');

var superAdminToken;
var adminToken;
var userToken;

describe('Auth Controller', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'test_secret';
        await closeServer();
        await startServer();
    });

    beforeEach(async () => {
        await UserModel.deleteMany({});
    });

    afterEach(async () => {
        await closeServer();
    });

    afterAll(async () => {
        await closeServer();
    });

    test('Super Admin registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User created');
        expect(res.body).toHaveProperty('user');

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = loginRes.body.token;
        expect(superAdminToken).toBeDefined();
        expect(res.body.user.username).toBe('superadmin');
    });

    test('Admin creation by Super Admin', async () => {
        const superAdminRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        const res = await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Admin created');

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = loginRes.body.token;
        expect(adminToken).toBeDefined();
        expect(loginRes.body.user.username).toBe('adminuser');
    });

    test('User registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User created');
        expect(res.body).toHaveProperty('user');

        const user = res.body.user;
        expect(user).toBeDefined();
    });

    test('User login', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');

        token = res.body.token; // Capture the token for later use
        expect(token).toBeDefined(); // Ensure token is defined
        expect(res.body.user.username).toBe('testuser');
    });
});

describe('Book Controller', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'test_secret';
        await startServer();
    });


    beforeEach(async () => {
        await UserModel.deleteMany({});
        await BookModel.deleteMany({});
    });


    afterAll(async () => {
        await closeServer();
    });

    test('Add a book', async () => {
        const superAdminRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        const adminRes = await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });
        expect(bookRes.statusCode).toBe(201);
        expect(bookRes.body.title).toBe('Test Book');
    });

    test('Get all books', async () => {
        const superAdminRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        const adminRes = await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = loginRes.body.token;
        const res = await request(app)
            .get('/api/books')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('Get searched books', async () => {
        const superAdminRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        const adminRes = await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = loginRes.body.token;
        const res = await request(app)
            .get('/api/books/?query=Test')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('Request Controller', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'test_secret';
        await startServer();
    });


    beforeEach(async () => {
        await UserModel.deleteMany({});
        await BookModel.deleteMany({});
        await RequestModel.deleteMany({});
    });

    afterAll(async () => {
        await closeServer();
    });

    test('create request', async () => {
        const superAdminRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });

        const bookId = bookRes.body._id;

        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });
        const userLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = userLoginRes.body.token;
        const res = await request(app)
            .post('/api/requests')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ bookId });

        expect(res.statusCode).toBe(201);
        expect(res.body.bookId).toBe(bookId.toString());
    });

    test('handle request accept', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });

        const bookId = bookRes.body._id;

        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });
        const userLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = userLoginRes.body.token;
        const requestRes = await request(app)
            .post('/api/requests')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ bookId });

        const requestId = requestRes.body._id;

        const acceptedRes = await request(app)
            .post('/api/requests/handle')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ requestId, status: "accepted" });

        expect(acceptedRes.body.status).toBe("accepted");
    });

    test('handle request decline', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });

        const bookId = bookRes.body._id;

        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });
        const userLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = userLoginRes.body.token;
        const requestRes = await request(app)
            .post('/api/requests')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ bookId });

        const requestId = requestRes.body._id;

        const declinedRes = await request(app)
            .post('/api/requests/handle')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ requestId, status: "declined" });

        expect(declinedRes.body.status).toBe("declined");
    });

    test('return request', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        const bookRes = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Book',
                author: 'Author Name',
                quantity: 10,
                publishYear: 2020
            });

        const bookId = bookRes.body._id;

        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'Password123!',
                email: 'testuser@example.com',
            });
        const userLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        userToken = userLoginRes.body.token;
        const requestRes = await request(app)
            .post('/api/requests')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ bookId });

        const requestId = requestRes.body._id;

        await request(app)
            .post('/api/requests/handle')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ requestId, status: "accepted" });

        const returnRes = await request(app)
            .post('/api/requests/return')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ requestId, status: "returned" });

        expect(returnRes.body.status).toBe("returned");
    });
});


describe('Category Controller', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'test_secret';
        await startServer();
    });


    beforeEach(async () => {
        await UserModel.deleteMany({});
        await BookModel.deleteMany({});
        await RequestModel.deleteMany({});
    });

    afterAll(async () => {
        await closeServer();
    });

    test('Get Category', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'superadmin',
                password: 'Password123!',
                email: 'superadmin@example.com',
                role: 'super_admin'
            });

        const superAdminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'superadmin@example.com',
                password: 'Password123!',
            });

        superAdminToken = superAdminLoginRes.body.token;
        await request(app)
            .post('/api/admin/add-admin')
            .set('Authorization', `Bearer ${superAdminToken}`)
            .send({
                username: 'adminuser',
                password: 'Password123!',
                category: 'someCategory',
                email: "adminuser@example.com"
            });

        const adminLoginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'adminuser@example.com',
                password: 'Password123!',
            });

        adminToken = adminLoginRes.body.token;
        
        const res = await request(app)
            .get('/api/categories')
            .set('Authorization', `Bearer ${userToken}`)

        expect(res.body.length).toBeGreaterThan(0);
    });
});