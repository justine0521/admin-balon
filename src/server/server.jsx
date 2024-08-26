const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define data schema and model
const DataSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    age: Number,
    civilStatus: String,
    voterStatus: String
});

const Data = mongoose.model('Data', DataSchema);

// Routes
app.get('/resident', async (req, res) => {
    try {
        const residents = await Data.find();
        res.json(residents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/resident', async (req, res) => {
    const newResident = new Data(req.body);
    try {
        const savedResident = await newResident.save();
        res.status(201).json(savedResident);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
