
const { BookModel } = require("../models/book-model");
const { RequestModel } = require("../models/request-model");

const createRequest = async (req, res) => {
  const { bookId } = req.body;
  const book = await BookModel.findById(bookId);

  if (!book || book.quantity < 1) {
    return res.status(400).json({ message: 'Book not available' });
  }

  const request = new Request({
    userId: req.user._id,
    bookId,
  });

  await request.save();
  book.quantity -= 1;
  await book.save();

  res.status(201).json(request);
};

const handleRequest = async (req, res) => {
  const { requestId, status } = req.body;
  const request = await RequestModel.findById(requestId).populate('bookId');

  if (status === 'accepted') {
    request.status = status;
    request.returnDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    await request.save();

    request.bookId.quantity -= 1;
    await request.bookId.save();
  } else if (status === 'declined') {
    request.status = status;
    await request.save();
  }
  res.json(request);
};

const getUserRequests = async (req, res) => {
  const userRequests = await Request.find({ userId: req.user._id }).populate('bookId');
  res.json(userRequests);
};

const getUserTakenBooks = async (req, res) => {
  const takenBooks = await Request.find({ userId: req.user._id, status: 'accepted' }).populate('bookId');
  res.json(takenBooks);
};

module.exports = { createRequest, handleRequest, getUserRequests, getUserTakenBooks };