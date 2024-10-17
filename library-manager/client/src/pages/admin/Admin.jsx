import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchAdminsThunk } from '../../slices/AdminSlice'
import NoResultFull from '../../components/noResult-full/NoResultFull';
import Loader from '../../components/loader/Loader';
import "./Admin.css"

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, loading, error } = useSelector(state => state.admins);

  useEffect(() => {
    dispatch(fetchAdminsThunk());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className='adminWrapper'>
      {loading ? <Loader /> :
        <div className='adminContainer'>
          <button onClick={()=>navigate("/createadmin")}>Add Admin</button>
          <div className='adminCardWrapper'>
            {admins.length > 0 ? admins.map(admin => (
              <div key={admin._id} className='adminCard'>
                <img src="https://static.thenounproject.com/png/363640-200.png" alt="avatar" />
                <p>Username - {admin.username}</p>
                <p>Contact - {admin.email}</p>
                <p>Category - {admin.category}</p>
              </div>
            )) : <NoResultFull />}
          </div>
        </div>}
    </div>
  );
};

export default Admin;
