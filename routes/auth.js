import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/Student.js';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    console.error('JWT_SECRET is not set in environment variables');
    process.exit(1);
}

router.post('/login', async (req, res) => {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
        return res.status(400).json({ message: 'Roll number and password are required' });
    }

    try {
        const student = await Student.findOne({ rollNo });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = {
            id: student._id,
            rollNo: student.rollNo
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        
        res.json({ token, rollNo: student.rollNo });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

router.post('/register', async (req, res) => {
    const { rollNo, name, password } = req.body;

    if (!rollNo || !name || !password) {
        return res.status(400).json({ message: 'Roll number, name, and password are required' });
    }

    try {
        let student = await Student.findOne({ rollNo });
        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        student = new Student({
            rollNo,
            name,
            password
        });

        await student.save();
        const payload = {
            id: student._id,
            rollNo: student.rollNo,
            name: student.name
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token, student: { rollNo: student.rollNo, name: student.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
