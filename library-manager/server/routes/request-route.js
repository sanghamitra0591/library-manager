const express = require('express');
const { createRequest, handleRequest, getUserRequests, getUserTakenBooks } = require('../controllers/request-controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth-validator-middleware');
const requestRouter = express.Router();

requestRouter.post('/', authMiddleware, createRequest);

requestRouter.post('/handle', authMiddleware, handleRequest);

requestRouter.get('/my-requests', authMiddleware, getUserRequests);

requestRouter.get('/my-taken-books', authMiddleware, getUserTakenBooks);

module.exports = requestRouter;
