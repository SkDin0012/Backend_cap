
const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/create', authMiddleware(), createAppointment); 
router.get('/', authMiddleware(), getAppointments); 

router.post('/counselor/create', authMiddleware(['Counselor']), createAppointment); 

module.exports = router;
