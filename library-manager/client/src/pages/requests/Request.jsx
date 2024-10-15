import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsThunk, handleRequestThunk } from '../../slices/RequestSlice';
import "./Request.css";

const Requests = () => {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector(state => state.requests);
    console.log(requests)

    useEffect(() => {
        dispatch(fetchRequestsThunk());
    }, [dispatch]);

    const handleRequest = (requestId, status) => {
        dispatch(handleRequestThunk({ requestId, status }));
    };

    return (
        <div className='RequestsWrapper'>
            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> :
                <div className='requestCardsWrapper'>
                    {requests.length > 0 && requests.map(request => (
                        <div key={request._id} className="requestCard">
                            <div className='requestCardDataHolder'>
                                <div className='requestCardBooksDetails'>
                                    <h4>{request.book?.title}</h4>
                                    <p>Published Year: {request.book?.publishYear}</p>
                                    <p>Category: {request.book?.category}</p>
                                    <p>Quantity Available: {request.book?.quantity}</p>
                                </div>
                                <div className='requestCardUserDetails'>
                                    <h3>User Details</h3>
                                    <p>username : {request.user?.username}</p>
                                    <p>email : {request.user?.email}</p>
                                    <p>User Penalty : {request.user?.penalties}</p>
                                </div>
                            </div>
                            <div className='requestCardButtonsHolder'>
                                <button onClick={() => handleRequest(request._id, 'accepted')} disabled={request.status !== 'pending'}>
                                    Accept
                                </button>
                                <button onClick={() => handleRequest(request._id, 'declined')} disabled={request.status !== 'pending'}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Requests;