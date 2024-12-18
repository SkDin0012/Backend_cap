import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCounselor } from '../redux/slices/counselorSlice';

const AddCounselorForm = () => {
    const dispatch = useDispatch();
    const successMessage = useSelector((state) => state.counselors.successMessage);
    const loading = useSelector((state) => state.counselors.loading); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [expertise, setExpertise] = useState('');
    const [services, setServices] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !expertise || !services) {
            setError('All fields are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const counselorData = {
            name,
            email,
            expertise: expertise.split(',').map(item => item.trim()),
            services: services.split(',').map(item => item.trim()),
        };

        try {
            await dispatch(createCounselor(counselorData)).unwrap();

            setName('');
            setEmail('');
            setExpertise('');
            setServices('');
        } catch (err) {
            setError(err.message || 'Failed to create counselor.'); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded">
            <h2>Add Counselor</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Expertise (comma-separated)"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Services (comma-separated)"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Counselor'}
            </button>
        </form>
    );
};

export default AddCounselorForm;
