import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequestsThunk } from '../../slices/RequestSlice';
import { resetUser } from '../../slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import ProfileBookCard from '../../components/profileBookCard/ProfileBookCard';

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
    }, [dispatch, tab]);

    const handleLogout = () => {
        dispatch(resetUser());
        navigate("/login")
    }

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
                    {loading && <p>Loading...</p>}
                    {!loading && !error &&
                        <div className={tab === "pending" ? "showRequests" : "hideRequests"}>
                            {userRequests.length > 0 && userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            ))}
                        </div>
                    }
                    {!loading && !error &&
                        <div className={tab === "accepted" ? "showAcceptedRequests" : "hideAcceptedRequests"}>
                            {userRequests.length > 0 && userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            ))}
                        </div>
                    }
                    {!loading && !error &&
                        <div className={tab === "declined" ? "showDeclinedRequests" : "hideDeclinedRequests"}>
                            {userRequests.length > 0 && userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            ))}
                        </div>
                    }
                    {!loading && !error &&
                        <div className={tab === "returned" ? "showReturnededRequests" : "hideReturnedRequests"}>
                            {userRequests.length > 0 && userRequests.map(request => (
                                <ProfileBookCard key={request._id} props={request} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
