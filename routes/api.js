const express = require('express');
const router = express.Router();

const Tortilla = require('../models/Tortilla');

/* GET home page. */
router.get('/tortillas', async (req, res, next) => {
  const { username } = req.query;
  try {
    const allTortillas = await Tortilla.find().populate('creator');
    const filteredTortillas = allTortillas.filter(tortillas => {
      return tortillas.creator.username === username;
    });
    if (!filteredTortillas.length) {
      res.status(404);
      res.json({ message: 'Tortillas not found for that user' });
      return;
    }
    res.json(filteredTortillas);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
