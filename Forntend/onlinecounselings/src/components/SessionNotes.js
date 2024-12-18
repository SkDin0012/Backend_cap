import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSessionNote, clearSuccessMessage } from '../redux/slices/sessionNoteSlice';

const SessionNotes = () => {
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const dispatch = useDispatch();

    const { loading, successMessage } = useSelector((state) => state.sessionNote || {});

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setUploadProgress(0);

        if (content.trim().length < 5) {
            setErrorMessage('Content must be at least 5 characters long.');
            return;
        }

        const counselorId = 'Counselor_ID_Here';
        const formData = new FormData();
        formData.append('note', content);
        formData.append('counselor', counselorId);

        let validUpload = true;
        attachments.forEach(({ file }) => {
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
            if (!validTypes.includes(file.type)) {
                setErrorMessage('Please upload files of type JPEG, PNG, PDF, DOCX, or DOC.');
                validUpload = false;
            } else if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('Each file must be under 5MB.');
                validUpload = false;
            } else {
                formData.append('attachments', file);
            }
        });

        if (!validUpload) {
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percent = Math.floor((loaded * 100) / total);
                setUploadProgress(percent);
            },
        };

        dispatch(createSessionNote({ formData, config }))
            .then(() => {
                setContent('');
                setAttachments([]);
                setUploadProgress(0);
            })
            .catch((err) => {
                console.error('Failed to save session note:', err);
                setErrorMessage('Failed to save session note.');
                setUploadProgress(0);
            });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => ({
            file,
            uploadTime: new Date().toLocaleString()
        }));
        setAttachments((prevFiles) => [...prevFiles, ...newAttachments]);
        setErrorMessage('');
    };

    const removeFile = (index) => {
        setAttachments((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-4">
            <h2>Add Session Notes</h2>
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                className="form-control"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    setErrorMessage('');
                                }}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="attachment">Attachments</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                multiple
                                disabled={loading}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Note'}
                        </button>
                        {uploadProgress > 0 && (
                            <div className="progress mt-3">
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    style={{ width: `${uploadProgress}%` }}
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    </form>
                </div>
                <div className="col-md-4">
                    <h4>Uploaded Files</h4>
                    <ul className="list-group mt-3">
                        {attachments.map(({ file, uploadTime }, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {file.name} <small className="text-muted">({uploadTime})</small>
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFile(index)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SessionNotes;
