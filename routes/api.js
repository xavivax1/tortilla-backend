const express = require('express');
const router = express.Router();

const Tortilla = require('../models/Tortilla');

/* GET home page. */
router.get('/tortillas', async (req, res, next) => {
  // const { username } = req.query;
  try {
    const allTortillas = await Tortilla.find();
    if (!allTortillas.length) {
      res.status(404);
      res.json({ message: 'Tortillas not found' });
      return;
    }
    res.json(allTortillas);
  } catch (error) {
    next(error);
  }
});

/* GET home page. */
router.get('/tortillas/:id', async (req, res, next) => {
  // const { username } = req.query;

  const { id } = req.params;
  console.log(id);
  try {
    const tortilla = await Tortilla.findById(id);
    if (!tortilla) {
      res.status(404);
      res.json({ message: 'Tortilla id not found' });
      return;
    }
    res.json(tortilla);
  } catch (error) {
    next(error);
  }
});


router.post('/tortillas', async (req, res, next) => {
  const tortilla = req.body;
  if (!tortilla.size || !tortilla.name || !tortilla.special) {
    res.status(400);
    res.json({ message: 'Make sure you include name, size and special' });
    return;
  }
  try {
    const newTortilla = await Tortilla.create(tortilla);
    res.status(200);
    res.json(newTortilla);
  } catch (error) {
    next(error);
  }
});

router.put('/tortillas/:id', async (req, res, next) => {
  const { name, special, size, imageUrl } = req.body;
  if (!name || !special || !size || !imageUrl) {
    res.status(400);
    res.json({ message: 'Make sure you include all the fields' });
    return;
  }
  const { id } = req.params;
  const tortilla = {
    name,
    special,
    size,
    imageUrl
  };
  try {
    const editedTortilla = await Tortilla.findByIdAndUpdate(id, tortilla, { new: true });
    res.status(200);
    res.json({ message: 'Tortilla updated', data: editedTortilla });
  } catch (error) {
    next(error);
  }
});

router.delete('/tortillas/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTortilla = await Tortilla.findByIdAndDelete(id);
    res.status(200);
    res.json({ message: 'Tortilla deleted', data: deletedTortilla });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
