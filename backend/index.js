const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const workoutRoute = require('./routes/workoutRoute');
const userRoutes = require('./routes/user');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODB_URL;

// Enable CORS for specific frontend URL
app.use(cors({
    origin: 'https://super-panda-80ebea.netlify.app', // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(express.json());

mongoose.connect(MONGODBURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err.message));

app.get('/', (req, res) => {
    res.send('Hello backend');
});

app.use('/api/workouts', workoutRoute);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
