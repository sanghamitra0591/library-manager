import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk, searchBooksThunk, sortBooks, requestBookThunk, filterBooks, deleteBookThunk, updateBookThunk } from '../../slices/BookSlice';
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
    const { books, loading } = useSelector(state => state.books);
    const { userRequests } = useSelector(state => state.requests);
    const { categories, loading: categoriesLoading } = useSelector(state => state.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [requestLoading, setRequestLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchBooksAndRequests = async () => {
            await dispatch(fetchBooksThunk());
            if (currentUser.role !== "admin") {
                await dispatch(fetchCategoriesThunk());
            }
            if (currentUser.role === "user") {
                await dispatch(fetchUserRequestsThunk());
            }
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

    const handleSearchInput = (e) => {
        e.preventDefault();
        if(e.target.value===""){
            dispatch(fetchBooksThunk())
        }
        setSearchTerm(e.target.value);
    }

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

    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            const action = await dispatch(deleteBookThunk(bookId));
            if (deleteBookThunk.rejected.match(action)) {
                toast.error("Delete failed");
            } else {
                toast.success("Book deleted");
            }
        }
    };

    const handleUpdate = async (bookId) => {
        const updatedData = prompt("Enter new quantity:", "0");
        if (updatedData) {
            const action = await dispatch(updateBookThunk({ bookId, updatedData: { quantity: Number(updatedData) } }));
            if (updateBookThunk.rejected.match(action)) {
                toast.error("Update failed");
            } else {
                toast.success("Book updated");
            }
        }
    };

    return (
        <div className='BooksWrapper'>
            <div className='bookButtonsWrapper'>
                {currentUser.role !== "admin" && categoriesLoading ? (
                    currentUser.role !== "admin" && <p>Loading categories...</p>
                ) : (
                    currentUser.role !== "admin" && <select onChange={handleCategoryChange}>
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
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchInput(e)}
                        placeholder="Search books by title"
                    />
                    <button type='submit'>{searchLoading ? "Searching" : "Search"}</button>
                </form>

                {currentUser?.role === "admin" && <button onClick={() => navigate("/addbook")}>Add Book</button>}
            </div>

            {requestLoading && <h2>Requesting...</h2>}

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
                                {(currentUser?.role === "admin" || currentUser?.role ==="super_admin") && (
                                    <>
                                        <button onClick={() => handleUpdate(book._id)}>Update Quantity</button>
                                        <button onClick={() => handleDelete(book._id)}>Delete Book</button>
                                    </>
                                )}
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
