
const Counselor = require('../models/Counselor');

const createCounselor = async (req, res) => {
    const { name, email, expertise, services } = req.body;

    try {
        const newCounselor = new Counselor({
            name,
            email,
            expertise,
            services,
        });

        await newCounselor.save();
        res.status(201).json(newCounselor); 
    } catch (error) {
        console.error('Error creating counselor:', error);
        res.status(400).json({ message: 'Error creating counselor', error });
    }
};

const getCounselors = async (req, res) => {
    try {
        const counselors = await Counselor.find();
        res.status(200).json(counselors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCounselorById = async (req, res) => {
    try {
        const counselor = await Counselor.findById(req.params.id);
        if (!counselor) {
            return res.status(404).json({ message: 'Counselor not found' });
        }
        res.status(200).json(counselor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCounselor = async (req, res) => {
    try {
        const counselor = await Counselor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!counselor) {
            return res.status(404).json({ message: 'Counselor not found' });
        }
        res.status(200).json(counselor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCounselor = async (req, res) => {
    try {
        const counselor = await Counselor.findByIdAndDelete(req.params.id);
        if (!counselor) {
            return res.status(404).json({ message: 'Counselor not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCounselor,
    getCounselors,
    getCounselorById,
    updateCounselor,
    deleteCounselor,
};
