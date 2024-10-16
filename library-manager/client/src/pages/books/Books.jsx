
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk, searchBooksThunk, sortBooks, requestBookThunk } from '../../slices/BookSlice';
import "./Books.css"
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import NoResultFull from '../../components/noResult-full/NoResultFull';

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const { books, loading, error } = useSelector(state => state.books);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLoading(true);
    if (searchTerm) {
      const action = dispatch(searchBooksThunk(searchTerm));
      if (searchBooksThunk.rejected.match(action)) {
        setSearchLoading(false);
        alert("Search failed");
      } else {
        setSearchLoading(false);
      }
    } else if (searchTerm === "") {
      const action = dispatch(fetchBooksThunk());
      if (fetchBooksThunk.rejected.match(action)) {
        setSearchLoading(false);
        alert("Books Not Found");
      } else {
        setSearchLoading(false);
      }
    }
  };

  console.log({searchLoading})

  const handleSort = (sortBy) => {
    dispatch(sortBooks(sortBy));
  };

  const handleRequest = async (bookId) => {
    setRequestLoading(true);
    const action = await dispatch(requestBookThunk(bookId));

    if (requestBookThunk.rejected.match(action)) {
      setRequestLoading(false);
      alert("Request failed")
    } else {
      setRequestLoading(false);
      alert("Request sent");
      dispatch(fetchBooksThunk());
    }
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
          <button onClick={handleSearch}>{searchLoading ? "Searching" : "Search"}</button>
        </div>

        {currentUser?.role === "admin" && <button onClick={() => navigate("/addbook")}>Add Book</button>}
      </div>

      {requestLoading && <h2>Requesting...</h2>}

      {error && <p>{error}</p>}
      {loading ? <Loader /> :
        <div className='allBooksHolder'>
          {books.length > 0 ? books.map(book => (
            <div key={book._id} className='bookCardWrapper'>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Published Year: {book.publishYear}</p>
              <p>Category: {book.category}</p>
              <h4>Available Quantity: {book.quantity}</h4>
              {currentUser?.role !== "admin" && <button disabled={book.quantity <= 0} onClick={() => handleRequest(book._id)}>{book.quantity > 0 ? "Request Book" : "Not Available"}</button>}
            </div>
          )) : <NoResultFull />}
        </div>
      }
    </div>
  );
};

export default Books;
