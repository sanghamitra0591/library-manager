import { useState } from 'react';
import './CreateAdmin.css';

const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
    };

    return (
        <div className='createAdminWrapper'>
            <div className='createAdminContainer'>
                <h2>Create Admin</h2>
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
                    <button type="submit">CreateAdmin</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAdmin;