import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequestsThunk, returnRequestThunk } from '../../slices/RequestSlice';
import { resetUser } from '../../slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import ProfileBookCard from '../../components/profileBookCard/ProfileBookCard';
import Loader from '../../components/loader/Loader';
import NoResult from '../../components/noResult/NoResult';
import { toast } from 'react-toastify';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tab, setTab] = useState("none");
    const { currentUser } = useSelector(state => state.auth);
    const { userRequests, loading, error } = useSelector(state => state.requests);
    useEffect(() => {
        if (tab !== "none") {
            dispatch(fetchUserRequestsThunk(tab));
        }
    }, [tab]);

    const handleLogout = () => {
        dispatch(resetUser());
        navigate("/login")
    }

    const handleReturnRequest = async (requestId) => {
        const action = await dispatch(returnRequestThunk({ requestId, status: "returned" }));

        if (returnRequestThunk.rejected.match(action)) {
            toast.error("Return Unsuccessful");
        } else {
            toast.success("Return Successful");
            if (tab !== "none") {
                dispatch(fetchUserRequestsThunk(tab));
            }
        }
    };


    return (
        <div className='profileWrapper'>
            <div className='profileContainer'>
                <div className='profileSettings'>
                    <div onClick={() => setTab("none")}>
                        <p>Account</p>
                    </div>
                    {currentUser?.role === "user" && <div onClick={() => setTab("pending")}>
                        <p>My Requests</p>
                    </div>}
                    {currentUser?.role === "user" && <div onClick={() => setTab("accepted")}>
                        <p>Accepted Requests</p>
                    </div>}
                    {currentUser?.role === "user" && <div onClick={() => setTab("declined")}>
                        <p>Declined Requests</p>
                    </div>}
                    {currentUser?.role === "user" && <div onClick={() => setTab("returned")}>
                        <p>Book History</p>
                    </div>}
                    <div>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
                <div className='profileContentHolder'>
                    {error && <p>{error}</p>}
                    {loading && <Loader />}
                    {!loading && !error && <div className={tab === "none" ? "showProfile" : "hideProfile"}><div className="showProfileSettings">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIudtTcOnMdwrWvu8IugZnHqEyiCSq4NYu1A&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixWENwTZdvqJbo7WMo7JJX4yBrk5Mif_bxg&s" alt="userAvatar" />
                    </div>
                        <div className='profileDetailsContainer'>
                            <h2>Hello {currentUser.username}!</h2>
                            <div className='userNameContainer'>
                                <label>Username:</label>
                                <input type="text" value={currentUser.username} readOnly />
                            </div>
                            <div className='emailContainer'>
                                <label>Email:</label>
                                <input type="email" value={currentUser.email} readOnly />
                            </div>
                            {currentUser.role === "user" && <div className='penaltyContainer'>
                                <label>Penalty:</label>
                                <input type="email" value={currentUser.penalties} readOnly />
                            </div>}
                            <div className='logoutButtonConatiner'>
                                <button onClick={() => handleLogout()}>Logout</button>
                            </div>
                        </div>
                    </div>
                    }
                    {!loading && !error && currentUser.role === "user" &&
                        <div className={tab === "pending" ? "showRequests" : "hideRequests"}>
                            {userRequests.length > 0 ? userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            )) : <NoResult />}
                        </div>
                    }
                    {!loading && !error && currentUser.role === "user" &&
                        <div className={tab === "accepted" ? "showAcceptedRequests" : "hideAcceptedRequests"}>
                            {userRequests.length > 0 ? userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} onReturn={handleReturnRequest} />
                            )) : <NoResult />}
                        </div>
                    }

                    {!loading && !error && currentUser.role === "user" &&
                        <div className={tab === "declined" ? "showDeclinedRequests" : "hideDeclinedRequests"}>
                            {userRequests.length > 0 ? userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            )) : <NoResult />}
                        </div>
                    }
                    {!loading && !error && currentUser.role === "user" &&
                        <div className={tab === "returned" ? "showReturnededRequests" : "hideReturnedRequests"}>
                            {userRequests.length > 0 ? userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            )) : <NoResult />}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
