const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); 
const router = express.Router();

const secretKey = process.env.JWT_SECRET; 

router.post('/login', async (req, res) => {
    const { rollNo, password } = req.body;
    try {
        const student = await Student.findOne({ rollNo });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ rollNo: student.rollNo }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
