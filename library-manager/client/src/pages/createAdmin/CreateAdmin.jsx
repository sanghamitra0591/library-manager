import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminThunk } from '../../slices/AdminSlice';
import './CreateAdmin.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoAccess from '../../components/noAccess/NoAccess';

const CreateAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { currentUser } = useSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminData = { username, email, password, category };
        const action = await dispatch(addAdminThunk(adminData));

        if (addAdminThunk.rejected.match(action)) {
            setError(action.payload);
            setLoading(false);
            toast.error("Admin not created");
        } else {
            toast.success("Admin created successfully");
            setLoading(false);
            navigate("/admin");
        }
    };

    return (
        <div className='createAdminWrapper'>
            {currentUser.role === "super_admin" ?
                <div className='createAdminContainer'>
                    <h2>Create Admin</h2>
                    {error && <p style={{ color: "Red" }} className="error">{error}</p>}
                    <form className="createAdminForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Enter User Name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        /><br />
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br />
                        <input
                            type="text"
                            placeholder='Enter Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        /><br />
                        <input
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /><br />
                        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Admin"}</button>
                    </form>
                </div> : <NoAccess />}
        </div>
    );
}

export default CreateAdmin;
