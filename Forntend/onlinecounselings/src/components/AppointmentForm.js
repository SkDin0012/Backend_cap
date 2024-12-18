import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../redux/slices/appointmentSlice";

const AppointmentForm = ({ counselors, loading, error }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [counselor, setCounselor] = useState("");
  const dispatch = useDispatch();

  const appointmentLoading = useSelector((state) => state.appointment.loading);
  const successMessage = useSelector(
    (state) => state.appointment.successMessage
  );
  const errorMessage = useSelector((state) => state.appointment.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
      alert("Please select a future date and time.");
      return;
    }

    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    const appointmentData = {
      date: formattedDate,
      time: formattedTime,
      description,
      counselor,
    };

    console.log("Submitting appointment data:", appointmentData);

    const resultAction = await dispatch(createAppointment(appointmentData));

    if (createAppointment.fulfilled.match(resultAction)) {
      console.log("Appointment created successfully!");
      resetForm();
    } else {
      console.error("Error creating appointment:", resultAction.error.message);
    }
  };

  const resetForm = () => {
    setDate("");
    setTime("");
    setDescription("");
    setCounselor("");
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate().toString().padStart(2, "0")}/${(
      dateObj.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${dateObj.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedHours = (((+hours + 11) % 12) + 1)
      .toString()
      .padStart(2, "0");
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Book an Appointment</h5>
      </div>
      <div className="card-body">
        {(loading || appointmentLoading) && <div>Loading...</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="counselor" className="form-label">
              Counselor
            </label>
            <select
              className="form-control"
              id="counselor"
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
              required
            >
              <option value="">Select a counselor</option>
              {counselors && counselors.length > 0 ? (
                counselors.map((counselor) => (
                  <option key={counselor._id} value={counselor._id}>
                    {counselor.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No counselors available
                </option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
