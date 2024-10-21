import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsThunk } from '../../slices/RequestSlice';
import "./Request.css";
import RequestCard from '../../components/requestCard/RequestCard';
import Loader from '../../components/loader/Loader';
import NoResultFull from '../../components/noResult-full/NoResultFull';

const Requests = () => {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector(state => state.requests);
    const [ displayedData, setDisplayedData ] = useState(requests);

    const [tab, setTab] = useState("pending");

    useEffect(()=>{
        if(tab==="all"){
            return setDisplayedData(requests);
        }
        const filteredData = requests.filter(el=>{
            return el.status===tab
        })
        setDisplayedData(filteredData)
    }, [tab, requests])

    useEffect(() => {
        dispatch(fetchRequestsThunk());
    }, [dispatch]);

    return (
        <div className='RequestsWrapper'>
            {error && <p style={{color: "Red"}}>{error}</p>}
            {loading ? <Loader /> :
                <div className='requestsContainer'>
                    <div className='requestTabHeaderWrapper'>
                        <div onClick={()=>setTab("pending")} className={tab==="pending" ? "requestTabHeaderSelected" : "requestTabHeader"}>
                            <p>Pending</p>
                        </div>
                        <div onClick={()=>setTab("accepted")} className={tab==="accepted" ? "requestTabHeaderSelected" : "requestTabHeader"}>
                            <p>Accepted</p>
                        </div>
                        <div onClick={()=>setTab("declined")} className={tab==="declined" ? "requestTabHeaderSelected" : "requestTabHeader"}>
                            <p>Declined</p>
                        </div>
                        <div onClick={()=>setTab("all")} className={tab==="all" ? "requestTabHeaderSelected" : "requestTabHeader"}>
                            <p>All</p>
                        </div>
                    </div>
                    <div className='requestTabBodyWrapper'>
                        <div className={tab==="pending" ? 'pendingRequestCardsWrapper' : 'hidePendingrequestCardsWrapper'}>
                            {displayedData.length > 0 ? displayedData.map(request => (
                                <RequestCard key={request._id} props={request} />
                            )) : <NoResultFull />}
                        </div>
                        <div className={tab==="accepted" ? 'acceptedRequestCardsWrapper' : 'hideAcceptedrequestCardsWrapper'}>
                            {displayedData.length > 0 ? displayedData.map(request => (
                                <RequestCard key={request._id} props={request} />
                            )) : <NoResultFull />}
                        </div>
                        <div className={tab==="declined" ? 'declinedRequestCardsWrapper' : 'hideDeclinedrequestCardsWrapper'}>
                            {displayedData.length > 0 ? displayedData.map(request => (
                                <RequestCard key={request._id} props={request} />
                            )) : <NoResultFull />}
                        </div>
                        <div className={tab==="all" ? 'allRequestCardsWrapper' : 'hideAllrequestCardsWrapper'}>
                            {displayedData.length > 0 ? displayedData.map(request => (
                                <RequestCard key={request._id} props={request} />
                            )) : <NoResultFull />}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Requests;