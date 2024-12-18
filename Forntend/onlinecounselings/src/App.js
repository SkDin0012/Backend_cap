// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppointmentsPage from './pages/AppointmentsPage';
import SessionNotes from './pages/SessionNodePage';
import PaymentPage from './pages/PaymentPage';
import AddCounselorForm from './components/AddCounselorForm';
import CounselorList from './components/CounselorList';
import CounselorProfile from './components/CounselorProfile';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/session-notes" element={<SessionNotes />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/add-counselor" element={<AddCounselorForm />} />
                    <Route path="/counselors" element={<CounselorList />} />
                    <Route path="/counselor-profile/:id" element={<CounselorProfile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
