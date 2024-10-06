
const express = require('express');
const router = express.Router();
const EvaluationResult = require('../models/EvaluationResult');

router.post('/', async (req, res) => {
    try {
        const { rollNo, scores, totalScore, maxPossibleScore, unansweredQuestions } = req.body;

        const newResult = new EvaluationResult({
            _id: rollNo,
            scores,
            totalScore,
            maxPossibleScore,
            unansweredQuestions
        });

        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
