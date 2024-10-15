import React from 'react'
import "./ProfileBookCard.css"

const ProfileBookCard = ({ props }) => {
    const request = props;
    const convertTime = (data) => {
        const date = new Date(data)
        const displayDate = `${String(date.getUTCDate()).padStart(2, '0')}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCFullYear()).slice(-2)} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
        return displayDate;
    }

    return (
        <div className="profileBookCardWrapper">
            <h3>{request.bookId?.title}</h3>
            <p>Published Year: {request.bookId?.publishYear}</p>
            <p>Category: {request.bookId?.category}</p>
            <p>Request Time: {convertTime(request.requestDate)}</p>
            {request.requestAccepted && <p>Accepted Time: {convertTime(request.requestAccepted)}</p>}
            {request.expectedReturnDate && <p>Return Before: {convertTime(request.expectedReturnDate)}</p>}
            {request.status === "pending" && <p style={{ backgroundColor: "orange" }} className='statusProfileBookCard'>{request.status}</p>}
            {request.status === "accepted" && <div>
                <p style={{ backgroundColor: "#6ce678" }}>{request.status}</p>
                <p style={{ backgroundColor: "#f5b342" }}>return</p>
            </div>}
            {request.status === "declined" && <p style={{ backgroundColor: "red" }} className='statusProfileBookCard'>{request.status}</p>}
            {request.status === "returned" && <p style={{ backgroundColor: "grey" }} className='statusProfileBookCard'>{request.status}</p>}
        </div>
    )
}

export default ProfileBookCard
