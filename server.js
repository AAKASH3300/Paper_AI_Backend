const express = require('express');
const { connect } = require('mongoose');
const { config } = require('dotenv');
const evaluationResultsRoute = require('./routes/evaluationResults');

config();

const app = express();
app.use(express.json());

connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/evaluation-results', evaluationResultsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
