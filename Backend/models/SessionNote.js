const mongoose = require('mongoose');

const sessionNoteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
    counselor: {
        type: String,
        required: true,
    },
    attachment: {
        type: String, // Store the file path
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('SessionNote', sessionNoteSchema);
