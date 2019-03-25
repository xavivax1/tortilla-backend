'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ObjectId = Schema.Types.ObjectId;

const tortillaSchema = new Schema({
  special: {
    type: String
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'big']
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

const Tortilla = mongoose.model('Tortilla', tortillaSchema);

module.exports = Tortilla;
