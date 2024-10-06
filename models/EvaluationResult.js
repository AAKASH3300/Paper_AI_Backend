
const mongoose = require('mongoose');

const evaluationResultSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    scores: { type: [Number], required: true },
    totalScore: { type: Number, required: true },
    maxPossibleScore: { type: Number, required: true },
    unansweredQuestions: { type: [String], required: true }
}, { collection: 'Students_result' });

module.exports = mongoose.model('EvaluationResult', evaluationResultSchema);
