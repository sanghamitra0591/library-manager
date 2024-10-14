import React from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser } = useSelector(state => state.auth);
    console.log(currentUser)
    return (
        <div className='profileWrapper'>
            <div className='profileSettings'>
                <div>
                    <p>Account</p>
                </div>
                <div>
                    <p>My Requests</p>
                </div>
                <div>
                    <p>Book History</p>
                </div>
                <div>
                    <button>Logout</button>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Profile
