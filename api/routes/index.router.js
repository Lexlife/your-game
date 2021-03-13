const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => res.json({ message: 'Hi from express' }));

module.exports = router;
