import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCounselors, updateCounselor, deleteCounselor } from '../redux/slices/counselorSlice';
import { Link } from 'react-router-dom';

const CounselorList = () => {
    const dispatch = useDispatch();
    const { counselors, loading, error } = useSelector((state) => state.counselors);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({ name: '', email: '', expertise: '', services: '' });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        dispatch(fetchCounselors());
    }, [dispatch]);

    const handleEdit = (counselor) => {
        setEditMode(counselor._id);
        setEditData({
            name: counselor.name,
            email: counselor.email,
            expertise: counselor.expertise.join(', '),
            services: counselor.services.join(', '),
        });
    };

    const handleUpdate = async (id) => {
        setUpdating(true);
        const updatedData = {
            name: editData.name,
            email: editData.email,
            expertise: editData.expertise.split(',').map(item => item.trim()),
            services: editData.services.split(',').map(item => item.trim()),
        };

        await dispatch(updateCounselor({ id, updatedData }));
        setEditMode(null);
        setUpdating(false); 
    };

    const handleDelete = async (id) => {
        await dispatch(deleteCounselor(id));
    };

    if (loading) return <div className="text-center"><strong>Loading...</strong></div>;
    if (error) return <div className="text-danger text-center">Error: {error.message}</div>;

    return (
        <div>
            <h2>Counselors</h2>
            <ul className="list-group">
                {counselors.map((counselor) => (
                    <li className="list-group-item" key={counselor._id}>
                        {editMode === counselor._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    placeholder="Name"
                                    required
                                />
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="text"
                                    value={editData.expertise}
                                    onChange={(e) => setEditData({ ...editData, expertise: e.target.value })}
                                    placeholder="Expertise (comma separated)"
                                    required
                                />
                                <input
                                    type="text"
                                    value={editData.services}
                                    onChange={(e) => setEditData({ ...editData, services: e.target.value })}
                                    placeholder="Services (comma separated)"
                                    required
                                />
                                <button 
                                    onClick={() => handleUpdate(counselor._id)} 
                                    className="btn btn-success"
                                    disabled={updating} 
                                >
                                    Save
                                </button>
                                <button onClick={() => setEditMode(null)} className="btn btn-secondary">Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{counselor.name}</h3>
                                <p>Email: {counselor.email}</p>
                                <p>Expertise: {counselor.expertise.join(', ')}</p>
                                <p>Services: {counselor.services.join(', ')}</p>
                                <Link to={`/counselor-profile/${counselor._id}`} className="btn btn-info">View Profile</Link>
                                <button onClick={() => handleEdit(counselor)} className="btn btn-warning">Edit</button>
                                <button onClick={() => handleDelete(counselor._id)} className="btn btn-danger">Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CounselorList;
