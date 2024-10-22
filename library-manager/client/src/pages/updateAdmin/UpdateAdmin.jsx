import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAdminThunk } from '../../slices/AdminSlice';
import Loader from '../../components/loader/Loader';
import NoAccess from '../../components/noAccess/NoAccess';
import "./UpdateAdmin.css";

const UpdateAdmin = () => {
    const { adminId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth);
    const { admins, loading, error } = useSelector(state => state.admins);

    const [ buttonloading, setButtonLoading ] = useState(false);

    const userRole = currentUser?.role;

    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        category: '',
    });

    useEffect(() => {
        if (userRole !== "super_admin") {
            return <NoAccess />
        }

        const adminToUpdate = admins.find(admin => admin._id === adminId);
        if (adminToUpdate) {
            setAdminData({
                username: adminToUpdate.username,
                email: adminToUpdate.email,
                category: adminToUpdate.category,
            });
        }
    }, [adminId, admins, userRole]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonLoading(true);
        dispatch(updateAdminThunk({ adminId, data: adminData }))
            .unwrap()
            .then(() => {
                navigate('/admin');
                setButtonLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setButtonLoading(false);
            });
    };

    if (loading) return <Loader />;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (userRole !== "super_admin") return <NoAccess />;

    return (
        <div className="updateAdminWrapper">
            <div className='updateAdminContainer'>
                <h2>Update Admin</h2>
                {error && <p style={{color: "Red"}} className="error">{error}</p>}
                <form className="updateAdminForm" onSubmit={handleSubmit}>
                    <div>
                        <label>Username : </label>
                        <input
                            type="text"
                            name="username"
                            value={adminData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email : </label>
                        <input
                            type="email"
                            name="email"
                            value={adminData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Category : </label>
                        <input
                            type="text"
                            name="category"
                            value={adminData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">{buttonloading? "Updating..." : "Update Admin"}</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdmin;
