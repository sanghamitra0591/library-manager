import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk, setUser } from "../../slices/AuthSlice"
import Cookies from 'js-cookie';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loginData = { email, password };

        const action = await dispatch(loginUserThunk(loginData));

        if (loginUserThunk.rejected.match(action)) {
            setError(action.payload);
            setLoading(false);
        } else {
            const { token } = action.payload;
            Cookies.set('authToken', token, { expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true, secure: true});
            setLoading(false);
            toast.success("Successfully Logged In")
            dispatch(setUser(action.payload.user))
            navigate("/")
        }
    };

    return (
        <div className='loginWrapper'>
            <div className='loginContainer'>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form className="loginForm" onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                </form>
                <p>Don't have an account? <span><Link to="/signup">Create Account</Link></span></p>
            </div>
        </div>
    );
};

export default Login;