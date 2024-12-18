const express = require('express');
const { createSessionNote, getSessionNotes } = require('../controllers/sessionNoteController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/createSession', authMiddleware, upload.single('attachment'), createSessionNote);
router.get('/getSessionNotes', getSessionNotes);

module.exports = router;
