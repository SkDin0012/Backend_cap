import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCounselorById } from '../redux/slices/counselorSlice';
import { useParams } from 'react-router-dom';

const CounselorProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedCounselor, loading, error } = useSelector((state) => state.counselors);

    useEffect(() => {
        if (id) {
            dispatch(fetchCounselorById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">Error: {error.message}</div>;

    return (
        <div>
            <h1>Counselor Profile</h1>
            {selectedCounselor ? (
                <div>
                    <h2>{selectedCounselor.name}</h2>
                    <p>Email: {selectedCounselor.email}</p>
                    <p>Expertise: {selectedCounselor.expertise.join(', ')}</p>
                    <p>Services: {selectedCounselor.services.join(', ')}</p>
                </div>
            ) : (
                <div>No counselor found</div>
            )}
        </div>
    );
};

export default CounselorProfile;
