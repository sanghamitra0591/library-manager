// Admin.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminsThunk } from '../../slices/AdminSlice'
import NoResultFull from '../../components/noResult-full/NoResultFull';
import Loader from '../../components/loader/Loader';
import "./Admin.css"

const Admin = () => {
  const dispatch = useDispatch();
  const { admins, loading, error } = useSelector(state => state.admins);

  useEffect(() => {
    dispatch(fetchAdminsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='adminWrapper'>
      {loading ? <Loader /> :
        <div>
          <h1>Admin List</h1>
          {admins.length > 0 ? <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Category</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin._id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.category}</td>
                  <td>{admin.role}</td>
                </tr>
              ))}
            </tbody>
          </table> : <NoResultFull />}
        </div>}
    </div>
  );
};

export default Admin;
