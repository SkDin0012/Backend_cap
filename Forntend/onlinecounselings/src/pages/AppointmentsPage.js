import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCounselors } from '../redux/slices/counselorSlice';
import AppointmentForm from '../components/AppointmentForm';

const ParentComponent = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCounselors());
    }, [dispatch]);

    return (
        <div>
            <AppointmentForm />
        </div>
    );
};

export default ParentComponent;
