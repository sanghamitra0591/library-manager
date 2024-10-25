import React, { useState } from 'react'
import pendingwatermark from "../../assets/images/pendingwatermark.png"
import accepedwatermark from "../../assets/images/acceptedwatermark.png"
import declinedwatermark from "../../assets/images/declinedwatermark.png"
import "./ProfileBookCard.css"

const ProfileBookCard = ({ props, onReturn }) => {

    const request = props;

    const [loading, setLoading] = useState(false);

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

        return displayDate
    };

    const handleReturn = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onReturn(request._id);
        setLoading(false);
    };

    return (
        <div className="profileBookCardWrapper">
            {request.status === "pending" && <img className="overlay" src={pendingwatermark} alt="watermark" />}
            {request.status === "accepted" && <img className="overlay" src={accepedwatermark} alt="watermark" />}
            {request.status === "declined" && <img className="overlay" src={declinedwatermark} alt="watermark" />}
            <div className="content">
                <h3>{request.bookId?.title}</h3>
                <p>Published Year: {request.bookId?.publishYear}</p>
                <p>Category: {request.bookId?.category}</p>
                <p>Request Time: {convertTime(request.requestDate)}</p>
                <p>Penalty: {request.penalty}</p>
                {request.requestAccepted && <p>Accepted Time: {convertTime(request.requestAccepted)}</p>}
                {request.expectedReturnDate && <p className={request.returnDate ? '' : 'returnDate'}>Return Before: {convertTime(request.expectedReturnDate)}</p>}
                {request.returnDate && <p>Return Date: {convertTime(request.returnDate)}</p>}
                {request.status === "accepted" && (
                    <div>
                        <button onClick={handleReturn} style={{ backgroundColor: "#5a3e29" }} disabled={loading}>
                            {loading ? "Returning..." : "Return"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileBookCard