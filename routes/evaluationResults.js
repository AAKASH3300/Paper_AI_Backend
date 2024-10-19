import express from 'express';
import jwt from 'jsonwebtoken';
import EvaluationResult from '../models/EvaluationResult.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); 

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

router.get('/results/:rollNo', async (req, res) => {
    try {
        const { rollNo } = req.params;
        const result = await EvaluationResult.findById(rollNo);

        if (!result) {
            return res.status(404).json({ message: "Evaluation result not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST route to save evaluation result with photo and scanned PDF
router.post('/save', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'scannedPdf', maxCount: 1 }]), async (req, res) => {
    try {
        const { rollNo, name, section, class: className, scores, totalScore, maxPossibleScore, unansweredQuestions } = req.body;
        const photoFile = req.files['photo'] ? req.files['photo'][0] : null;
        const pdfFile = req.files['scannedPdf'] ? req.files['scannedPdf'][0] : null;

        const newResult = new EvaluationResult({
            _id: rollNo,
            name,
            section,
            class: className,
            photo: photoFile ? photoFile.buffer : undefined,
            scores: JSON.parse(scores), 
            totalScore,
            maxPossibleScore,
            unansweredQuestions: JSON.parse(unansweredQuestions),
            scannedPdf: pdfFile ? pdfFile.buffer : undefined
        });

        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
