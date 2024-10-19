import mongoose from 'mongoose';

const evaluationResultSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    name: { type: String, required: true },           
    section: { type: String, required: true },        
    class: { type: String, required: true },          
    photo: { type: [Buffer] },  // Changed to an array of Buffers
    scores: { type: [Number], required: true },
    totalScore: { type: Number, required: true },
    maxPossibleScore: { type: Number, required: true },
    unansweredQuestions: { type: [String], required: true },
    scannedPdf: { type: Buffer }                      
}, { collection: 'Students_result' });

export default mongoose.model('EvaluationResult', evaluationResultSchema);
