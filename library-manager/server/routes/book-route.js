const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth-validator-middleware');
const { addBook, getAllBooks, searchBooks } = require('../controllers/book-controller');
const bookRouter = express.Router();

bookRouter.post('/', authMiddleware, roleMiddleware(['super_admin']), addBook);
bookRouter.get('/', authMiddleware, getAllBooks);
bookRouter.get('/search/:query', authMiddleware, searchBooks);

module.exports = bookRouter;