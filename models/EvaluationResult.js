
const mongoose = require('mongoose');

const evaluationResultSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    name: { type: String, required: true },           
    section: { type: String, required: true },        
    class: { type: String, required: true },          
    photo: { type: Buffer },                          
    scores: { type: [Number], required: true },
    totalScore: { type: Number, required: true },
    maxPossibleScore: { type: Number, required: true },
    unansweredQuestions: { type: [String], required: true },
    scannedPdf: { type: Buffer }                      
}, { collection: 'Students_result' });

module.exports = mongoose.model('EvaluationResult', evaluationResultSchema);
