const express = require('express');
const {
    createCounselor,
    getCounselors,
    getCounselorById,
    updateCounselor,
    deleteCounselor,
} = require('../controllers/counselorController');

const router = express.Router();

router.post('/create', createCounselor);
router.get('/', getCounselors);
router.get('/:id', getCounselorById);
router.put('/:id', updateCounselor);
router.delete('/:id', deleteCounselor);

module.exports = router;
