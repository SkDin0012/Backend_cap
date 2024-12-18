import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccessMessage } from '../redux/slices/userSlice'; 
// import LogoutButton from './LogoutButton';

const HomePage = () => {
    const dispatch = useDispatch();
    const { userInfo, successMessage } = useSelector((state) => state.user);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage()); 
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, dispatch]);

    return (
        <div className="container">
            <h1>Welcome to the Online Counseling Platform</h1>
            <h2>{userInfo ? `Welcome, ${userInfo.name}!` : 'Welcome, Guest!'}</h2>
            <p>
                We provide professional counseling services to help you with mental health, relationship advice, and career counseling. 
                Explore our services and book an appointment today.
            </p>
            {/* {userInfo && <LogoutButton />} */}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>} 
        </div>
    );
};

export default HomePage;
