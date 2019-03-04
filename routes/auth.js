const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  res.render('auth/signup');
});

router.post('/signup', async (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  // Extraer body
  const { username, password } = req.body;
  // Comprobar que username y password existen
  if (!password || !username) {
    res.redirect('/auth/signup');
    return;
  }
  // Comprar que el usuario no existe en la base de datos
  try {
    const result = await User.findOne({ username });
    if (result) {
      res.redirect('/auth/signup');
      return;
    }
    // Encryptar password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Crear el usuario
    const newUser = {
      username,
      password: hashedPassword
    };
    const createdUser = await User.create(newUser);
    // Guardamos el usuario en la session
    req.session.currentUser = createdUser;
    // Redirigimos para la homepage
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
