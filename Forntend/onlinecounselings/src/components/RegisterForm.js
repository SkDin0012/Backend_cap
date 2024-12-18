import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/userSlice';
import '../Login.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, successMessage, userInfo } = useSelector((state) => state.user);

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setName('');
                setEmail('');
                setPassword('');
                setRole('client');
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, navigate]);

    useEffect(() => {
        if (userInfo) {
            console.log("User registered:", userInfo);
        }
    }, [userInfo]);

    const validateForm = () => {
        let valid = true;
        setNameError('');
        setEmailError('');
        setPasswordError('');

        if (!name) {
            setNameError('Name cannot be empty.');
            valid = false;
        } else if (!namePattern.test(name)) {
            setNameError('Name must contain only letters and spaces.');
            valid = false;
        } else if (name.length > 50) {
            setNameError('Name cannot exceed 50 characters.');
            valid = false;
        }

        if (!email) {
            setEmailError('Email cannot be empty.');
            valid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError('Invalid email format.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password cannot be empty.');
            valid = false;
        } else if (!passwordPattern.test(password)) {
            setPasswordError('Password must be at least 8 characters long, contain 1 letter, 1 number, and 1 special character.');
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const resultAction = await dispatch(registerUser({ name, email, password, role }));
            if (registerUser.fulfilled.match(resultAction)) {
                console.log("Registration successful:", resultAction.payload);
            } else {
                console.error("Registration failed:", resultAction.error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={nameError ? 'input-error' : ''}
                            required
                        />
                        {nameError && <small className="error-message">{nameError}</small>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'input-error' : ''}
                            required
                        />
                        {emailError && <small className="error-message">{emailError}</small>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? 'input-error' : ''}
                            required
                        />
                        {passwordError && <small className="error-message">{passwordError}</small>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="client">Client</option>
                            <option value="counselor">Counselor</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Sign Up'}
                        </button>
                    </div>
                    {error && <div className="error-message">{error.message}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
