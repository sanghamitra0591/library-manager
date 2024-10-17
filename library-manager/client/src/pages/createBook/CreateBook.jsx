import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookThunk } from "../../slices/BookSlice";
import './CreateBook.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bookData = { title, author, publishYear, quantity };
        const action = await dispatch(createBookThunk(bookData));

        if (createBookThunk.rejected.match(action)) {
            setError(action.payload);
            setLoading(false);
            toast.error("Book not created")
        } else {
            toast.success("Book created successfully");
            setLoading(false);
            navigate("/books");
        }
    };

    return (
        <div className='createBookWrapper'>
            <div className='createBookContainer'>
                <h2>Create Book</h2>
                {error && <p className="error">{error}</p>}
                <form className="createBookForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Enter Book Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    /><br />
                    <input
                        type="text"
                        placeholder='Enter Author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    /><br />
                    <input
                        type="text"
                        placeholder='Enter Publish Year'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        required
                    /><br />
                    <input
                        type="number"
                        placeholder='Enter Quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    /><br />
                    <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Book"}</button>
                </form>
            </div>
        </div>
    );
}

export default CreateBook;
