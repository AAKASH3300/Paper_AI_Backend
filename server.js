import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors'; 
import authRoutes from './routes/auth.js';
import evaluationResultsRoute from './routes/evaluationResults.js';

config();

const app = express();
app.use(express.json());

connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api', evaluationResultsRoute);
app.use('/api/auth', authRoutes);
app.use(cors({
    origin: 'http://localhost:5000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
