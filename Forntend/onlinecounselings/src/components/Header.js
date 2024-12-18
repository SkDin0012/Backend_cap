import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import '../Login.css'; 

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo); 

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            dispatch(logout());
            navigate('/login'); 
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">Counseling Services</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {userInfo ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments">Appointments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/session-notes">Session Notes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/payment">Payment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/counselors">Counselor List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-counselor">Add Counselor</Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {userInfo.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-link nav-link" 
                                        onClick={handleLogout} 
                                        aria-label="Logout"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
