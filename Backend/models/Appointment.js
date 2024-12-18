
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    counselor: { type: mongoose.Schema.Types.ObjectId, ref: 'Counselor', required: true },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
