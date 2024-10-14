
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk, searchBooksThunk, sortBooks, requestBookThunk } from '../../slices/BookSlice';
import "./Books.css"

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state.books);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchBooksThunk(searchTerm));
    }
  };

  const handleSort = (sortBy) => {
    dispatch(sortBooks(sortBy));
  };

  const handleRequest = (bookId) => {
    dispatch(requestBookThunk(bookId));
  };

  return (
    <div>
      <h1>Books</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books by title"
      />
      <button onClick={handleSearch}>Search</button>

      <select onChange={(e) => handleSort(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="publishYear">Sort by Publish Year</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishYear}</p>
            <p>Category: {book.category}</p>
            <p>Available Quantity: {book.quantity}</p>
            <button onClick={() => handleRequest(book._id)}>Request Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
