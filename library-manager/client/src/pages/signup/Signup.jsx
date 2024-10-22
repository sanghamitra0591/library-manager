import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUserThunk } from "../../slices/AuthSlice";
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        if (username.length < 3 || username.length > 30) {
            setError("Username must be between 3 and 30 characters.");
            setLoading(false);
            return;
        }

        if (!validator.isEmail(email)) {
            setError("Invalid email format.");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError("Password must include uppercase, lowercase, numbers, and special characters.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const signupData = { username, email, password };
        const action = await dispatch(signupUserThunk(signupData));
        
        if (signupUserThunk.rejected.match(action)) {
            setError(action.payload);
            setLoading(false);
        } else {
            toast.success("Account created successfully!");
            setLoading(false);
            navigate("/login");
        }
    };

    return (
        <div className='signupWrapper'>
            <div className='signupContainer'>
                <h2>Create Account</h2>
                {error && <p style={{color: "Red"}} className="error">{error}</p>}
                <form className="signupForm" onSubmit={handleSubmit}>
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
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br />
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /><br />
                    <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
                </form>
                <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
            </div>
        </div>
    );
}

export default Signup;
