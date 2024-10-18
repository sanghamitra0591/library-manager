import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk, searchBooksThunk, sortBooks, requestBookThunk, filterBooks } from '../../slices/BookSlice';
import { fetchCategoriesThunk } from '../../slices/CategorySlice';
import "./Books.css";
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import NoResultFull from '../../components/noResult-full/NoResultFull';
import { toast } from 'react-toastify';
import { fetchUserRequestsThunk } from '../../slices/RequestSlice';

const Books = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth);
    const { books, loading, error } = useSelector(state => state.books);
    const { userRequests } = useSelector(state => state.requests);
    const { categories, loading: categoriesLoading } = useSelector(state => state.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [requestLoading, setRequestLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchBooksAndRequests = async () => {
            if (currentUser.role !== "admin") {
                await dispatch(fetchCategoriesThunk());
            }
            if (currentUser.role === "user") {
                await dispatch(fetchUserRequestsThunk());
            }
            await dispatch(fetchBooksThunk());
        };

        fetchBooksAndRequests();
    }, [dispatch, currentUser.role]);

    const getRequestStatus = (bookId) => {
        if (currentUser.role !== "user") return null;
        const request = userRequests.find(req => req.bookId._id === bookId);
        return request ? request.status : null;
    };

    const handleSort = (sortBy) => {
        dispatch(sortBooks(sortBy));
    };

    const handleRequest = async (bookId) => {
        if (currentUser.role !== "user") return;
        setRequestLoading(true);
        const action = await dispatch(requestBookThunk(bookId));

        if (requestBookThunk.rejected.match(action)) {
            setRequestLoading(false);
            toast.error("Request failed");
        } else {
            setRequestLoading(false);
            toast.success("Request sent");
            dispatch(fetchBooksThunk());
            if (currentUser.role === "user") {
                await dispatch(fetchUserRequestsThunk());
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchLoading(true);
        const action = dispatch(searchBooksThunk(searchTerm));
        if (searchBooksThunk.rejected.match(action)) {
            setSearchLoading(false);
            toast.error("Search failed");
        } else {
            setSearchLoading(false);
        }
        dispatch(filterBooks({ searchTerm, selectedCategory }));
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        dispatch(filterBooks({ searchTerm, selectedCategory: newCategory }));
    };

    return (
        <div className='BooksWrapper'>
            <div className='bookButtonsWrapper'>
                {currentUser.role!=="admin" && categoriesLoading ? (
                    currentUser.role!=="admin" && <p>Loading categories...</p>
                ) : (
                    currentUser.role!=="admin" && <select onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                )}
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
                    {books.length > 0 ? books.map(book => {
                        const requestStatus = getRequestStatus(book._id);
                        let buttonText = "Request Book";
                        let isDisabled = false;

                        if (requestStatus === 'pending') {
                            buttonText = "Pending Request";
                            isDisabled = true;
                        } else if (requestStatus === 'accepted') {
                            buttonText = "Request Accepted";
                            isDisabled = true;
                        } else if (requestStatus === 'declined' || requestStatus === 'returned') {
                            buttonText = "Request Book";
                        }

                        return (
                            <div key={book._id} className='bookCardWrapper'>
                                <h2>{book.title}</h2>
                                <p>Author: {book.author}</p>
                                <p>Published Year: {book.publishYear}</p>
                                <p>Category: {book.category}</p>
                                <h4>Available Quantity: {book.quantity}</h4>
                                {currentUser?.role === "user" && (
                                    <button
                                        disabled={book.quantity <= 0 || isDisabled}
                                        onClick={() => handleRequest(book._id)}
                                    >
                                        {buttonText}
                                    </button>
                                )}
                            </div>
                        );
                    }) : <NoResultFull />}
                </div>
            }
        </div>
    );
};

export default Books;
