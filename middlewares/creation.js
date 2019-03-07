module.exports = {
  requirePicture (req, res, next) {
    if (!req.file) {
      req.flash('validation', 'Please make sure you add a picture');
      res.redirect('/new');
      return;
    }
    next();
  }
};
