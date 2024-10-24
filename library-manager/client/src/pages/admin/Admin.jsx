import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteAdminThunk, fetchAdminsThunk } from '../../slices/AdminSlice'
import NoResultFull from '../../components/noResult-full/NoResultFull';
import Loader from '../../components/loader/Loader';
import "./Admin.css"
import NoAccess from '../../components/noAccess/NoAccess';
import adminavtar from "../../assets/images/adminavatar.png"

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const { admins, loading, error } = useSelector(state => state.admins);

  const userRole = currentUser.role;

  useEffect(() => {
    if (userRole === "super_admin") {
      dispatch(fetchAdminsThunk());
    }
  }, [dispatch]);

  const handleUpdateAdmin = (admin) => {
    navigate(`/updateadmin/${admin._id}`);
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      dispatch(deleteAdminThunk(adminId));
    }
  };

  return (
    <div className='adminWrapper'>
      {userRole === "super_admin" ?
        (loading ? <Loader /> :
          <div className='adminContainer'>
            {error && <p style={{ color: "Red" }}>Error: {error}</p>}
            <button onClick={() => navigate("/createadmin")}>Add Admin</button>
            <div className='adminCardWrapper'>
              {admins.length > 0 ? admins.map(admin => (
                <div key={admin._id} className='adminCard'>
                  <img src={adminavtar} alt="avatar" />
                  <p>Username - {admin.username}</p>
                  <p>Contact - {admin.email}</p>
                  <p>Category - {admin.category}</p>
                  <div>
                    <button onClick={() => handleUpdateAdmin(admin)}>Update</button>
                    <button onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
                  </div>
                </div>
              )) : <NoResultFull />}
            </div>
          </div>) : <NoAccess />}
    </div>
  );
};

export default Admin;
