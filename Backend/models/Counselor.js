const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: [String], required: true },
    services: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
});

const Counselor = mongoose.model('Counselor', counselorSchema);
module.exports = Counselor;
