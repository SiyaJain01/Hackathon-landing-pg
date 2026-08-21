const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const DB_PATH = path.join(__dirname, '../data/registrations.json');

// Helper: read data
function loadData() {
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    let raw = fs.readFileSync(DB_PATH, 'utf-8');
    if (raw.charCodeAt(0) === 0xFEFF) {
      raw = raw.slice(1);
    }
    raw = raw.trim();
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

// Helper: write data
function saveData(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

// POST /api/register
router.post('/register', (req, res) => {
  const { name, email, team_name, track } = req.body;

  if (!name || !email || !team_name || !track) {
    return res.status(400).json({ success: false, message: 'All fields required!' });
  }

  const data = loadData();

  // Check duplicate
  if (data.find(r => r.email === email)) {
    return res.status(409).json({ success: false, message: 'Email already registered!' });
  }

  const entry = { name, email, team_name, track, registered_at: new Date().toISOString() };
  data.push(entry);
  saveData(data);

  res.json({ success: true, message: `Welcome to the canopy, ${name}! 🌲` });
});

// GET /api/count
router.get('/count', (req, res) => {
  const data = loadData();
  res.json({ count: data.length });
});

// GET /api/registrations  (admin use only)
router.get('/registrations', (req, res) => {
  res.json(loadData());
});

module.exports = router;