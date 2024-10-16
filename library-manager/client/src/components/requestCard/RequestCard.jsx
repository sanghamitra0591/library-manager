import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleRequestThunk } from '../../slices/RequestSlice';

const RequestCard = ({ props }) => {
    const request = props;
    const dispatch = useDispatch();
    const [loadingAction, setLoadingAction] = useState(null);

    const handleRequest = async (requestId, status) => {
        setLoadingAction(status); // Set loading for the specific action
        const result = await dispatch(handleRequestThunk({ requestId, status }));
        setLoadingAction(null); // Reset loading state
        if (handleRequestThunk.fulfilled.match(result)) {
            toast.success(`Request has been ${status === 'accepted' ? 'accepted' : 'declined'}.`);
        } else {
            toast.error('Failed to update the request.');
        }
    };

    const convertTime = (data) => {
        const date = new Date(data);

        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + istOffset);

        const day = String(istDate.getUTCDate()).padStart(2, '0');
        const month = istDate.toLocaleString('default', { month: 'short' }).toLowerCase();
        const year = istDate.getUTCFullYear();
        const hours = String(istDate.getUTCHours() % 12 || 12).padStart(2, '0');
        const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
        const ampm = istDate.getUTCHours() >= 12 ? 'pm' : 'am';

        const displayDate = `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;

        return displayDate;
    };

    return (
        <div className="requestCard">
            <div className='requestCardTime'>
                <h3>{request.status}</h3>
                <p>{convertTime(request.requestDate)}</p>
            </div>
            <div className='requestCardContainer'>
                <div className='requestCardDataHolder'>
                    <div className='requestCardBooksDetails'>
                        <h4>{request.book?.title}</h4>
                        <p>Published Year: {request.book?.publishYear}</p>
                        <p>Category: {request.book?.category}</p>
                        <p>Quantity Available: {request.book?.quantity}</p>
                    </div>
                    <div className='requestCardUserDetails'>
                        <h3>User Details</h3>
                        <p>username: {request.user?.username}</p>
                        <p>email: {request.user?.email}</p>
                        <p>User Penalty: {request.user?.penalties}</p>
                    </div>
                </div>
                <div className='requestCardButtonsHolder'>
                    <button onClick={() => handleRequest(request._id, 'accepted')} disabled={request.status !== 'pending'}>
                        {loadingAction === 'accepted' ? 'Accepting...' : (request.status === "accepted" ? "Accepted" : "Accept")}
                    </button>
                    <button onClick={() => handleRequest(request._id, 'declined')} disabled={request.status !== 'pending'}>
                        {loadingAction === 'declined' ? 'Declining...' : (request.status === "declined" ? "Declined" : "Decline")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequestCard;