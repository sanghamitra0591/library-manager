const express = require('express');
const { addAdmin, getAllUsers } = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth-validator-middleware');
const adminRouter = express.Router();

adminRouter.post('/add-admin', authMiddleware, roleMiddleware(['super_admin']), addAdmin);

adminRouter.get('/users', authMiddleware, roleMiddleware(['super_admin', 'admin']), getAllUsers);

adminRouter.get('/requests', authMiddleware, roleMiddleware(['admin', 'super_admin']), getRequests);

module.exports = adminRouter;