
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk, searchBooksThunk, sortBooks, requestBookThunk } from '../../slices/BookSlice';
import "./Books.css"
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const { books, loading, error } = useSelector(state => state.books);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchBooksThunk(searchTerm));
    } else if (searchTerm === "") {
      dispatch(fetchBooksThunk())
    }
  };

  const handleSort = (sortBy) => {
    dispatch(sortBooks(sortBy));
  };

  const handleRequest = (bookId) => {
    dispatch(requestBookThunk(bookId));
  };

  return (
    <div className='BooksWrapper'>
      <div className='bookButtonsWrapper'>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="publishYear">Sort by Publish Year</option>
        </select>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books by title"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {currentUser?.role === "admin" && <button onClick={() => navigate("/addbook")}>Add Book</button>}
      </div>

      {error && <p>{error}</p>}
      {loading ? <p>Loading...</p> :
        <div className='allBooksHolder'>
          {books.map(book => (
            <div key={book._id} className='bookCardWrapper'>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Published Year: {book.publishYear}</p>
              <p>Category: {book.category}</p>
              <h4>Available Quantity: {book.quantity}</h4>
              {currentUser?.role !== "admin" && <button disabled={book.quantity<=0} onClick={() => handleRequest(book._id)}>{book.quantity > 0 ? "Request Book" : "Not Available"}</button>}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Books;
