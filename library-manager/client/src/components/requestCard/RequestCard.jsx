import React from 'react'
import { useDispatch } from 'react-redux'
import { handleRequestThunk } from '../../slices/RequestSlice';

const RequestCard = ({props}) => {
    const request = props;
    const dispatch = useDispatch();

    const handleRequest = (requestId, status) => {
        dispatch(handleRequestThunk({ requestId, status }));
    };

    return (
        <div className="requestCard">
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
    )
}

export default RequestCard
