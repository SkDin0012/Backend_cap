const SessionNote = require('../models/SessionNote');
//const authMiddleware = require('../middlewares/authMiddleware');

const createSessionNote = async (req, res) => {
  try {
    const { content } = req.body;
    const attachment = req.file ? req.file.path : null;
    const sessionNote = await SessionNote.create({ content, attachment });
    res.json(sessionNote);
} catch (error) {
    res.status(400).json({ message: error.message });
}
};

const getSessionNotes = async (req, res) => {
    try {
        const sessionNotes = await SessionNote.find().populate('counselor').populate('client');
        res.json(sessionNotes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createSessionNote, getSessionNotes };
