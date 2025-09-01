const express = require('express');
const {login} = require('./controller');

const router = express.Router();

router.get('/_probe', (req, res) => res.json({ ok: true }));  // TEMP probe
router.post('/login', login);

module.exports = router;