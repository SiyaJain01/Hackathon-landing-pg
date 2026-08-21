const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const registerRoute = require('./routes/register');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', registerRoute);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Celestial Depths backend running 🌲' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});