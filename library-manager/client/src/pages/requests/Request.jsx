import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsThunk } from '../../slices/RequestSlice';
import "./Request.css";
import RequestCard from '../../components/requestCard/RequestCard';

const Requests = () => {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector(state => state.requests);
    console.log(requests)

    const [tab, setTab] = useState("pending");

    useEffect(() => {
        dispatch(fetchRequestsThunk());
    }, [dispatch]);

    return (
        <div className='RequestsWrapper'>
            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> :
                <div className='requestsContainer'>
                    <div className='requestTabHeaderWrapper'>
                        <div onClick={()=>setTab("pending")}>
                            <p>Pending</p>
                        </div>
                        <div onClick={()=>setTab("accepted")}>
                            <p>Accepted</p>
                        </div>
                        <div onClick={()=>setTab("declined")}>
                            <p>Declined</p>
                        </div>
                        <div onClick={()=>setTab("returned")}>
                            <p>All</p>
                        </div>
                    </div>
                    <div>
                        <div className='requestCardsWrapper'>
                            {requests.length > 0 && requests.map(request => (
                                <RequestCard key={request._id} props={request} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Requests;